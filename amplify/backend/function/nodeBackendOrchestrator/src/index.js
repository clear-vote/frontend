

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(
            {
                "precinct_id": 8913,
                "boundary_data": [
                    [
                        [-122.3066595, 47.653538],
                        [-122.3066595, 47.665538],
                        [-122.3186595, 47.665538],
                        [-122.3186595, 47.653538],
                        [-122.3066595, 47.653538]
                    ]
                ],
                'elections': []
            },
        ),
    };
};
