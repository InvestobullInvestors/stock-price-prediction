var express = require('express');
var router = express.Router();

const graphData = [
    {
        Date: '2020-07-15',
        Open: 308.600006,
        High: 310.000000,
        Low: 291.399994,
        Adj: 309.201996,
        Close: 309.201996,
        Volume: 81839000
    },
    {
        Date: '2020-07-16',
        Open: 295.432007,
        High: 306.342010,
        Low: 293.200012,
        Adj: 300.127991,
        Close: 300.127991,
        Volume: 71504000
    },
    {
        Date: '2020-07-17',
        Open: 302.690002,
        High: 307.502014,
        Low: 298.000000,
        Adj: 300.167999,
        Close: 300.167999,
        Volume: 46650000
    },
    {
        Date: '2020-07-20',
        Open: 303.802002,
        High: 330.000000,
        Low: 297.600006,
        Adj: 328.600006,
        Close: 328.600006,
        Volume: 85607000
    },
    {
        Date: '2020-07-21',
        Open: 327.985992,
        High: 335.000000,
        Low: 311.600006,
        Adj: 313.671997,
        Close: 313.671997,
        Volume: 80536000
    },
    {
        Date: '2020-07-22',
        Open: 319.799988,
        High: 325.283997,
        Low: 312.399994,
        Adj: 318.466003,
        Close: 318.466003,
        Volume: 70805500
    }
]

/* GET realtime data. */
router.get('/', function (req, res) {
    const labels = []
    const open = []
    const close = []

    for (let data of graphData) {
        labels.push(data.Date)
        open.push(data.Open)
        close.push(data.Close)
    }

    res.send({
        labels,
        datasets: [
            {
                label: 'Open',
                data: open,
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: 'Close',
                data: close,
                borderColor: "#742774"
            }
        ]
    })
});

module.exports = router;
