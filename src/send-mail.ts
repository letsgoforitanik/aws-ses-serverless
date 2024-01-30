import AWS from "aws-sdk";

const ses = new AWS.SES();

const from = 'letsgoforitanik@gmail.com';
const subject = 'Thanks';
const body = 'Thanks for joining us';


export async function handler(event: Event) {

    const { to } = JSON.parse(event.body);

    if (!to) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Bad request' })
        };
    }

    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Text: {
                    Data: body
                }
            },
            Subject: {
                Data: subject
            }
        },
        Source: from
    };

    try {
        await ses.sendEmail(params).promise();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(error)
        };
    }
}