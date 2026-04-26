const response = (statusCode, message, data) => {
    return {
        code: statusCode,
        status: statusCode < 400 ? 'success' : 'failed',
        message,
        data,
    };
};

export default response;
