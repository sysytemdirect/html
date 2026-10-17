let chart = null;


async function loadVoltage(){

    const response = await fetch("/api/history");

    const data = await response.json();


    data.reverse();


    const labels = data.map(
        item => item.created_at
    );


    const values = data.map(
        item => item.voltage
    );


    drawChart(labels, values);
}



function drawChart(labels, values){

    const ctx =
        document.getElementById("voltageChart");


    if(!chart){

        chart = new Chart(ctx, {

            type:"line",

            data:{

                labels: labels,

                datasets:[{

                    label:"Voltage(V)",

                    data:values,

                    tension:0.3,

                    pointRadius:2
                }]
            },


            options:{

                responsive:true,

                animation:false,

                scales:{

                    x:{
                        ticks:{
                            maxTicksLimit:10
                        }
                    },

                    y:{
                        beginAtZero:false
                    }

                }

            }

        });


    }else{

        chart.data.labels = labels;

        chart.data.datasets[0].data = values;

        chart.update();

    }

}


loadVoltage();

setInterval(loadVoltage,1000);