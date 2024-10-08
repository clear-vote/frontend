import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal
import json
from typing import List, Dict

# Initialize a session using Amazon DynamoDB and Lambda
session = boto3.Session()
lambda_client = session.client('lambda')
table_name = 'ElectionTable'
lambda_arn = 'arn:aws:lambda:us-west-2:058264528055:function:precinct-mapper-coordinates'
session = boto3.Session(region_name='us-west-2')
dynamodb = session.resource('dynamodb')


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super(DecimalEncoder, self).default(obj)

def get_coordinates(event):
    try:
        return {
            "longitude": event['longitude'],
            "latitude": event['latitude']
        }
    except KeyError as e:
        raise KeyError("Missing required parameters: 'longitude' and 'latitude'")

def get_precinct_data(longitude, latitude):
    try:
        response = lambda_client.invoke(
            FunctionName=lambda_arn,
            InvocationType='RequestResponse',
            Payload=json.dumps({
                'latitude': latitude,
                'longitude': longitude
            })
        )
        response_payload = json.loads(response['Payload'].read().decode('utf-8'))
        if 'errorMessage' in response_payload:
            raise response_payload['errorMessage']
        return response_payload
    except Exception as e:
        raise Exception("An error occurred while fetching precinct data: " + str(e))

def format_precinct_data(precinct_data):
    body = precinct_data['body']

    jurisdictions = {
        'Federal': body['Federal'],
        'Federal Legislature': body['Federal Legislature'],
        'State': body['State'],
        'State Legislature': body['State Legislature'],
        'City': body['City'],
        'City District': body['City District'],
        'County': body['County'],
        'County District': body['County District'],
        'School District': body['School District']
    }
    
    return { 
        'precinct_id': body['precinct_id'],
        'boundary_data': body['precinct_boundary'],
        'jurisdiction_data': jurisdictions
    }

def convert_decimals(obj):
    if isinstance(obj, list):
        return [convert_decimals(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimals(v) for k, v in obj.items()}
    elif isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    return obj

def get_elections(table_name, election_ids: List[int], geodata):
    
    table = dynamodb.Table(table_name)

    elections = []
    
    for election_id in election_ids:
        # Get election metadata
        response = table.get_item(
            Key={
                'PK': f"ELECTION#{election_id}",
                'SK': 'METADATA'
            }
        )
        election_data = response.get('Item', {})
        if not election_data:
            continue
        
        # Remove DynamoDB-specific attributes
        election_data = {k: v for k, v in election_data.items() 
                        if k not in ['PK', 'SK', 'entity_type']}
        
        # Get contests for each boundary type in geodata
        contests = []
        for boundary_type, value in geodata.items():
            if boundary_type in ["State Legislature", "Federal Legislature"]:
                jurisdiction = geodata.get('State')
                district = value
            elif boundary_type == "County District":
                jurisdiction = geodata.get('County')
                district = value
            elif boundary_type == "City District":
                jurisdiction = geodata.get('City')
                district = value
            elif boundary_type == "School District":
                jurisdiction = geodata.get('School District')
                district = value
            else:
                jurisdiction = value
                district = None

            # print (f"getting contests for {jurisdiction} {boundary_type} {district}")
            boundary_contests = get_contests(table, election_id, boundary_type, jurisdiction, district)
            contests.extend(boundary_contests)
        
        election_data['contests'] = contests
        elections.append(election_data)
    
    return convert_decimals(elections)

def get_contests(table, election_id: int, boundary_type: str, jurisdiction: str, district):
    # Construct GSI query
    gsi1sk = f"JURISDICTION#{jurisdiction}"
    if district:
        gsi1sk = f"{gsi1sk}#DISTRICT#{district}"
    
    response = table.query(
        IndexName='GSI1',
        KeyConditionExpression=Key('GSI1PK').eq(f"BOUNDARY#{boundary_type}") & 
                               Key('GSI1SK').eq(gsi1sk),
        FilterExpression=Key('PK').eq(f"ELECTION#{election_id}")
    )
    
    contests = []
    for contest in response['Items']:
        # print(f"    {contest['title']} {contest['district']}")
        contest_id = contest['SK'].split('#')[1]
        contest_data = {k: v for k, v in contest.items() 
                       if k not in ['PK', 'SK', 'GSI1PK', 'GSI1SK', 'entity_type']}
        
        # Get candidates for this contest
        candidates = get_candidates(table, election_id, contest_id)
        contest_data['candidates'] = candidates
        
        contests.append(contest_data)
    
    return contests

def get_candidates(table, election_id: int, contest_id: str):
    response = table.query(
        KeyConditionExpression=Key('PK').eq(f"ELECTION#{election_id}") & 
                               Key('SK').begins_with(f"CONTEST#{contest_id}#CANDIDATE#")
    )
    
    candidates = []
    for item in response['Items']:
        if '#BACKGROUND#' in item['SK']:
            continue
        
        candidate_data = {k: v for k, v in item.items() 
                         if k not in ['PK', 'SK', 'GSI1PK', 'GSI1SK', 'entity_type']}
        
        # Get background items for this candidate
        candidate_id = item['SK'].split('#')[3]
        background_items = get_background_items(table, election_id, contest_id, candidate_id)
        candidate_data['background'] = background_items
        
        candidates.append(candidate_data)
    
    return candidates

def get_background_items(table, election_id: int, contest_id: str, candidate_id: str):
    response = table.query(
        KeyConditionExpression=Key('PK').eq(f"ELECTION#{election_id}") & 
                               Key('SK').begins_with(f"CONTEST#{contest_id}#CANDIDATE#{candidate_id}#BACKGROUND#")
    )
    
    return [{k: v for k, v in item.items() 
             if k not in ['PK', 'SK', 'entity_type']} 
            for item in response['Items']]


def handler(event, context):
    try:
        print("invoking backend orchestrator with event: ", event)
        coordinates = get_coordinates(event)
        precinct_data = get_precinct_data(coordinates['longitude'], coordinates['latitude'])
        formatted_precinct_data = format_precinct_data(precinct_data)
        elections = get_elections(table_name, [888], formatted_precinct_data['jurisdiction_data'])
        print("returning response with data: ", formatted_precinct_data)
        return response_with_code(
            {
                'precinct_id': formatted_precinct_data['precinct_id'],
                'boundary_data': formatted_precinct_data['boundary_data'],
                'elections': elections
            },
            200
        )
    except Exception as e:
        return response_with_code({'error': 'An unexpected error occurred: ' + str(e)}, 500)

def response_with_code(body, status_code):
    return {
        'statusCode': status_code,
        'body': json.dumps(body),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }