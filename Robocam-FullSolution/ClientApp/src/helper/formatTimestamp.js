const formatTimeStamp = (timestamp) => {
    const options = { year: 'numeric', day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    return dateTimeFormat(timestamp);
}

export default formatTimeStamp;