document.addEventListener('DOMContentLoaded',async () => {

    async function getData(url) {
        let response = await fetch(url);
        let jsonData = await response.json();
        return jsonData
    }

    let ip_data = await getData("https://ipinfo.io/json?token=0d914362b03851");
    let tz_data = await getData("https://timezoneapi.io/api/ip/?token=aHVqWXFbNzNZkcxzlmLn");

    let {city,ip,loc,timezone} = ip_data,
        country = tz_data.data.country,
        date = (tz_data.data.datetime.date_time_txt.split(' ').slice(0,4)).join(' '),
        time = tz_data.data.datetime.time,
        timeDay = tz_data.data.datetime.timeday_gen,
        tz = tz_data.data.datetime.offset_tzab,
        week = tz_data.data.datetime.week;
})