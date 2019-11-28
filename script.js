console.log('Hello TensorFlow');

// Getting the data
async function getData() {
    const dataReq = await fetch('data.json');
    const data = await dataReq.json();
    return data;
}

// drawing the plots
async function run() {
    const years = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const setData = await getData();
    const data = [];
    for (let i = 0; i < years.length; i++) {
        let count = 0;
        for (let j = 0; j < setData.length; j++) {
            if (years[i] === setData[j].Season_Year) {
                count = count + 1;
            }
        }
        data.push({ year: years[i], count: count });
    }
    // note you need to convert it into INDEX and VALUE
    const values = data.map(item => {
        return { index: item.year, value: item.count };
    })
    // Render to visor
    const surface = { name: 'Bar chart', tab: 'Charts' };
    tfvis.render.barchart({ name: 'Match Count vs Year' },
        values,
        {
            xLabel: 'Season Year',
            yLabel: 'Match Count',
            width: 600,
            height: 300
        });

    // Load and plot the original input data that we are going to train on.

}
document.addEventListener('DOMContentLoaded', run);