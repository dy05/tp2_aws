

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`Lambda EVENT: ${JSON.stringify(event)}`);
    console.log(event);

    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
            message: 'Ok'
        }),
    };

    try {
        const AWS = require('aws-sdk');
        const regions = ['us-east-1'];
        console.log('regions --> ', regions);
        const resourcesByRegion = {};

        for (const region of regions) {
            resourcesByRegion[region] = {};
            const s3 = new AWS.S3({ region });

            const s3Buckets = await s3.listBuckets().promise();
            console.log('s3Buckets --> ', s3Buckets);
            resourcesByRegion[region].s3Buckets = s3Buckets.Buckets;

            // Add more AWS service API calls as needed for other resource types
        }

        response.body = JSON.stringify(resourcesByRegion);
    } catch (err) {
        console.log('err --> ', err)
        response.statusCode = 500;
        response.body = JSON.stringify({ error: err.message });
    }

    return response;
};
