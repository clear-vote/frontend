import json
import boto3
from candidate_database import get_elections

# Initialize a session using Amazon DynamoDB and Lambda
session = boto3.Session()
lambda_client = session.client('lambda')
table_name = 'ElectionTable'
lambda_arn = 'arn:aws:lambda:us-west-2:058264528055:function:precinct-mapper-coordinates'

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

def handler(event, context):
    try:
        coordinates = get_coordinates(event)
        precinct_data = get_precinct_data(coordinates['longitude'], coordinates['latitude'])
        formatted_precinct_data = format_precinct_data(precinct_data)
        elections = get_elections(table_name, [888], formatted_precinct_data['jurisdiction_data']) 
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