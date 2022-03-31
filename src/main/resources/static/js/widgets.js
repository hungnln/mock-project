"use strict";
var KTWidgets = {
    init: function () {
        var e, t, a, o, s, r, l, i, n, c, h;
        e = document.querySelectorAll(".statistics-widget-3-chart"), [].slice.call(e).map((function (e) {
            var t = parseInt(KTUtil.css(e, "height"));
            if (e) {
                var a = e.getAttribute("data-kt-chart-color"), o = KTUtil.getCssVariableValue("--bs-gray-800"),
                    s = KTUtil.getCssVariableValue("--bs-" + a), r = KTUtil.getCssVariableValue("--bs-light-" + a);
                new ApexCharts(e, {
                    series: [{name: "Net Profit", data: [30, 45, 32, 70, 40]}],
                    chart: {
                        fontFamily: "inherit",
                        type: "area",
                        height: t,
                        toolbar: {show: !1},
                        zoom: {enabled: !1},
                        sparkline: {enabled: !0}
                    },
                    plotOptions: {},
                    legend: {show: !1},
                    dataLabels: {enabled: !1},
                    fill: {type: "solid", opacity: 1},
                    stroke: {curve: "smooth", show: !0, width: 3, colors: [s]},
                    xaxis: {
                        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                        axisBorder: {show: !1},
                        axisTicks: {show: !1},
                        labels: {show: !1, style: {colors: o, fontSize: "12px"}},
                        crosshairs: {show: !1, position: "front", stroke: {color: "#E4E6EF", width: 1, dashArray: 3}},
                        tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                    },
                    yaxis: {min: 0, max: 80, labels: {show: !1, style: {colors: o, fontSize: "12px"}}},
                    states: {
                        normal: {filter: {type: "none", value: 0}},
                        hover: {filter: {type: "none", value: 0}},
                        active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                    },
                    tooltip: {
                        style: {fontSize: "12px"}, y: {
                            formatter: function (e) {
                                return "$" + e + " thousands"
                            }
                        }
                    },
                    fill: {type: "gradient", gradient: {stops: [0, 100]}},
                    colors: [s],
                    markers: {colors: [s], strokeColor: [r], strokeWidth: 3}
                }).render()
            }
        })), function () {
            var e = document.querySelectorAll(".statistics-widget-4-chart");
            [].slice.call(e).map((function (e) {
                var t = parseInt(KTUtil.css(e, "height"));
                if (e) {
                    var a = e.getAttribute("data-kt-chart-color"), o = KTUtil.getCssVariableValue("--bs-gray-800"),
                        s = KTUtil.getCssVariableValue("--bs-" + a), r = KTUtil.getCssVariableValue("--bs-light-" + a);
                    new ApexCharts(e, {
                        series: [{name: "Net Profit", data: [40, 40, 30, 30, 35, 35, 50]}],
                        chart: {
                            fontFamily: "inherit",
                            type: "area",
                            height: t,
                            toolbar: {show: !1},
                            zoom: {enabled: !1},
                            sparkline: {enabled: !0}
                        },
                        plotOptions: {},
                        legend: {show: !1},
                        dataLabels: {enabled: !1},
                        fill: {type: "solid", opacity: 1},
                        stroke: {curve: "smooth", show: !0, width: 3, colors: [s]},
                        xaxis: {
                            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                            axisBorder: {show: !1},
                            axisTicks: {show: !1},
                            labels: {show: !1, style: {colors: o, fontSize: "12px"}},
                            crosshairs: {
                                show: !1,
                                position: "front",
                                stroke: {color: "#E4E6EF", width: 1, dashArray: 3}
                            },
                            tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                        },
                        yaxis: {min: 0, max: 60, labels: {show: !1, style: {colors: o, fontSize: "12px"}}},
                        states: {
                            normal: {filter: {type: "none", value: 0}},
                            hover: {filter: {type: "none", value: 0}},
                            active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                        },
                        tooltip: {
                            style: {fontSize: "12px"}, y: {
                                formatter: function (e) {
                                    return "$" + e + " thousands"
                                }
                            }
                        },
                        fill: {type: "gradient", gradient: {stops: [0, 100]}},
                        colors: [s],
                        markers: {colors: [s], strokeColor: [r], strokeWidth: 3}
                    }).render()
                }
            }))
        }(), t = document.getElementById("kt_charts_widget_1_chart"), a = parseInt(KTUtil.css(t, "height")), o = KTUtil.getCssVariableValue("--bs-gray-500"), s = KTUtil.getCssVariableValue("--bs-gray-200"), r = KTUtil.getCssVariableValue("--bs-primary"), l = KTUtil.getCssVariableValue("--bs-gray-300"), t && new ApexCharts(t, {
            series: [{
                name: "Net Profit",
                data: [44, 55, 57, 56, 61, 58]
            }, {name: "Revenue", data: [76, 85, 101, 98, 87, 105]}],
            chart: {fontFamily: "inherit", type: "bar", height: a, toolbar: {show: !1}},
            plotOptions: {bar: {horizontal: !1, columnWidth: ["30%"], endingShape: "rounded"}},
            legend: {show: !1},
            dataLabels: {enabled: !1},
            stroke: {show: !0, width: 2, colors: ["transparent"]},
            xaxis: {
                categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                axisBorder: {show: !1},
                axisTicks: {show: !1},
                labels: {style: {colors: o, fontSize: "12px"}}
            },
            yaxis: {labels: {style: {colors: o, fontSize: "12px"}}},
            fill: {opacity: 1},
            states: {
                normal: {filter: {type: "none", value: 0}},
                hover: {filter: {type: "none", value: 0}},
                active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
            },
            tooltip: {
                style: {fontSize: "12px"}, y: {
                    formatter: function (e) {
                        return "$" + e + " thousands"
                    }
                }
            },
            colors: [r, l],
            grid: {borderColor: s, strokeDashArray: 4, yaxis: {lines: {show: !0}}}
        }).render(), function () {
            var e = document.getElementById("kt_charts_widget_2_chart"), t = parseInt(KTUtil.css(e, "height")),
                a = KTUtil.getCssVariableValue("--bs-gray-500"), o = KTUtil.getCssVariableValue("--bs-gray-200"),
                s = KTUtil.getCssVariableValue("--bs-warning"), r = KTUtil.getCssVariableValue("--bs-gray-300");
            e && new ApexCharts(e, {
                series: [{name: "Net Profit", data: [44, 55, 57, 56, 61, 58]}, {
                    name: "Revenue",
                    data: [76, 85, 101, 98, 87, 105]
                }],
                chart: {fontFamily: "inherit", type: "bar", height: t, toolbar: {show: !1}},
                plotOptions: {bar: {horizontal: !1, columnWidth: ["30%"], endingShape: "rounded"}},
                legend: {show: !1},
                dataLabels: {enabled: !1},
                stroke: {show: !0, width: 2, colors: ["transparent"]},
                xaxis: {
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    axisBorder: {show: !1},
                    axisTicks: {show: !1},
                    labels: {style: {colors: a, fontSize: "12px"}}
                },
                yaxis: {labels: {style: {colors: a, fontSize: "12px"}}},
                fill: {opacity: 1},
                states: {
                    normal: {filter: {type: "none", value: 0}},
                    hover: {filter: {type: "none", value: 0}},
                    active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                },
                tooltip: {
                    style: {fontSize: "12px"}, y: {
                        formatter: function (e) {
                            return "$" + e + " thousands"
                        }
                    }
                },
                colors: [s, r],
                grid: {borderColor: o, strokeDashArray: 4, yaxis: {lines: {show: !0}}}
            }).render()
        }(), function () {
            var e = document.getElementById("kt_charts_widget_3_chart"),
                t = (parseInt(KTUtil.css(e, "height")), KTUtil.getCssVariableValue("--bs-gray-500")),
                a = KTUtil.getCssVariableValue("--bs-gray-200"), o = KTUtil.getCssVariableValue("--bs-info"),
                s = KTUtil.getCssVariableValue("--bs-light-info");
            e && new ApexCharts(e, {
                series: [{name: "Net Profit", data: [30, 40, 40, 90, 90, 70, 70]}],
                chart: {fontFamily: "inherit", type: "area", height: 350, toolbar: {show: !1}},
                plotOptions: {},
                legend: {show: !1},
                dataLabels: {enabled: !1},
                fill: {type: "solid", opacity: 1},
                stroke: {curve: "smooth", show: !0, width: 3, colors: [o]},
                xaxis: {
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    axisBorder: {show: !1},
                    axisTicks: {show: !1},
                    labels: {style: {colors: t, fontSize: "12px"}},
                    crosshairs: {position: "front", stroke: {color: o, width: 1, dashArray: 3}},
                    tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                },
                yaxis: {labels: {style: {colors: t, fontSize: "12px"}}},
                states: {
                    normal: {filter: {type: "none", value: 0}},
                    hover: {filter: {type: "none", value: 0}},
                    active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                },
                tooltip: {
                    style: {fontSize: "12px"}, y: {
                        formatter: function (e) {
                            return "$" + e + " thousands"
                        }
                    }
                },
                colors: [s],
                grid: {borderColor: a, strokeDashArray: 4, yaxis: {lines: {show: !0}}},
                markers: {strokeColor: o, strokeWidth: 3}
            }).render()
        }(), function () {
            var e = document.getElementById("kt_charts_widget_4_chart"),
                t = (parseInt(KTUtil.css(e, "height")), KTUtil.getCssVariableValue("--bs-gray-500")),
                a = KTUtil.getCssVariableValue("--bs-gray-200"), o = KTUtil.getCssVariableValue("--bs-success"),
                s = KTUtil.getCssVariableValue("--bs-light-success"), r = KTUtil.getCssVariableValue("--bs-warning"),
                l = KTUtil.getCssVariableValue("--bs-light-warning");
            e && new ApexCharts(e, {
                series: [{name: "Net Profit", data: [60, 50, 80, 40, 100, 60]}, {
                    name: "Revenue",
                    data: [70, 60, 110, 40, 50, 70]
                }],
                chart: {fontFamily: "inherit", type: "area", height: 350, toolbar: {show: !1}},
                plotOptions: {},
                legend: {show: !1},
                dataLabels: {enabled: !1},
                fill: {type: "solid", opacity: 1},
                stroke: {curve: "smooth"},
                xaxis: {
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    axisBorder: {show: !1},
                    axisTicks: {show: !1},
                    labels: {style: {colors: t, fontSize: "12px"}},
                    crosshairs: {position: "front", stroke: {color: t, width: 1, dashArray: 3}},
                    tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                },
                yaxis: {labels: {style: {colors: t, fontSize: "12px"}}},
                states: {
                    normal: {filter: {type: "none", value: 0}},
                    hover: {filter: {type: "none", value: 0}},
                    active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                },
                tooltip: {
                    style: {fontSize: "12px"}, y: {
                        formatter: function (e) {
                            return "$" + e + " thousands"
                        }
                    }
                },
                colors: [o, r],
                grid: {borderColor: a, strokeDashArray: 4, yaxis: {lines: {show: !0}}},
                markers: {colors: [s, l], strokeColor: [s, l], strokeWidth: 3}
            }).render()
        }(), function () {
            var e = document.getElementById("kt_charts_widget_5_chart"),
                t = (parseInt(KTUtil.css(e, "height")), KTUtil.getCssVariableValue("--bs-gray-500")),
                a = KTUtil.getCssVariableValue("--bs-gray-200"), o = KTUtil.getCssVariableValue("--bs-primary"),
                s = KTUtil.getCssVariableValue("--bs-info");
            e && new ApexCharts(e, {
                series: [{name: "Net Profit", data: [40, 50, 65, 70, 50, 30]}, {
                    name: "Revenue",
                    data: [-30, -40, -55, -60, -40, -20]
                }],
                chart: {fontFamily: "inherit", type: "bar", stacked: !0, height: 350, toolbar: {show: !1}},
                plotOptions: {bar: {horizontal: !1, columnWidth: ["12%"], endingShape: "rounded"}},
                legend: {show: !1},
                dataLabels: {enabled: !1},
                stroke: {show: !0, width: 2, colors: ["transparent"]},
                xaxis: {
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    axisBorder: {show: !1},
                    axisTicks: {show: !1},
                    labels: {style: {colors: t, fontSize: "12px"}}
                },
                yaxis: {min: -80, max: 80, labels: {style: {colors: t, fontSize: "12px"}}},
                fill: {opacity: 1},
                states: {
                    normal: {filter: {type: "none", value: 0}},
                    hover: {filter: {type: "none", value: 0}},
                    active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                },
                tooltip: {
                    style: {fontSize: "12px"}, y: {
                        formatter: function (e) {
                            return "$" + e + " thousands"
                        }
                    }
                },
                colors: [o, s],
                grid: {borderColor: a, strokeDashArray: 4, yaxis: {lines: {show: !0}}}
            }).render()
        }(), function () {
            var e = document.getElementById("kt_charts_widget_6_chart"),
                t = (parseInt(KTUtil.css(e, "height")), KTUtil.getCssVariableValue("--bs-gray-500")),
                a = KTUtil.getCssVariableValue("--bs-gray-200"), o = KTUtil.getCssVariableValue("--bs-primary"),
                s = KTUtil.getCssVariableValue("--bs-light-primary"), r = KTUtil.getCssVariableValue("--bs-info");
            e && new ApexCharts(e, {
                series: [{
                    name: "Net Profit",
                    type: "bar",
                    stacked: !0,
                    data: [40, 50, 65, 70, 50, 30]
                }, {name: "Revenue", type: "bar", stacked: !0, data: [20, 20, 25, 30, 30, 20]}, {
                    name: "Expenses",
                    type: "area",
                    data: [50, 80, 60, 90, 50, 70]
                }],
                chart: {fontFamily: "inherit", stacked: !0, height: 350, toolbar: {show: !1}},
                plotOptions: {bar: {stacked: !0, horizontal: !1, endingShape: "rounded", columnWidth: ["12%"]}},
                legend: {show: !1},
                dataLabels: {enabled: !1},
                stroke: {curve: "smooth", show: !0, width: 2, colors: ["transparent"]},
                xaxis: {
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    axisBorder: {show: !1},
                    axisTicks: {show: !1},
                    labels: {style: {colors: t, fontSize: "12px"}}
                },
                yaxis: {max: 120, labels: {style: {colors: t, fontSize: "12px"}}},
                fill: {opacity: 1},
                states: {
                    normal: {filter: {type: "none", value: 0}},
                    hover: {filter: {type: "none", value: 0}},
                    active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                },
                tooltip: {
                    style: {fontSize: "12px"}, y: {
                        formatter: function (e) {
                            return "$" + e + " thousands"
                        }
                    }
                },
                colors: [o, r, s],
                grid: {
                    borderColor: a,
                    strokeDashArray: 4,
                    yaxis: {lines: {show: !0}},
                    padding: {top: 0, right: 0, bottom: 0, left: 0}
                }
            }).render()
        }(), function () {
            var e = document.getElementById("kt_charts_widget_7_chart"), t = parseInt(KTUtil.css(e, "height")),
                a = KTUtil.getCssVariableValue("--bs-gray-500"), o = KTUtil.getCssVariableValue("--bs-gray-200"),
                s = KTUtil.getCssVariableValue("--bs-gray-300"), r = KTUtil.getCssVariableValue("--bs-warning"),
                l = KTUtil.getCssVariableValue("--bs-light-warning"), i = KTUtil.getCssVariableValue("--bs-success"),
                n = KTUtil.getCssVariableValue("--bs-light-success"), c = KTUtil.getCssVariableValue("--bs-primary"),
                h = KTUtil.getCssVariableValue("--bs-light-primary");
            e && new ApexCharts(e, {
                series: [{name: "Net Profit", data: [30, 30, 50, 50, 35, 35]}, {
                    name: "Revenue",
                    data: [55, 20, 20, 20, 70, 70]
                }, {name: "Expenses", data: [60, 60, 40, 40, 30, 30]}],
                chart: {
                    fontFamily: "inherit",
                    type: "area",
                    height: t,
                    toolbar: {show: !1},
                    zoom: {enabled: !1},
                    sparkline: {enabled: !0}
                },
                plotOptions: {},
                legend: {show: !1},
                dataLabels: {enabled: !1},
                fill: {type: "solid", opacity: 1},
                stroke: {curve: "smooth", show: !0, width: 2, colors: [r, "transparent", "transparent"]},
                xaxis: {
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    axisBorder: {show: !1},
                    axisTicks: {show: !1},
                    labels: {show: !1, style: {colors: a, fontSize: "12px"}},
                    crosshairs: {show: !1, position: "front", stroke: {color: s, width: 1, dashArray: 3}},
                    tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                },
                yaxis: {labels: {show: !1, style: {colors: a, fontSize: "12px"}}},
                states: {
                    normal: {filter: {type: "none", value: 0}},
                    hover: {filter: {type: "none", value: 0}},
                    active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                },
                tooltip: {
                    style: {fontSize: "12px"}, y: {
                        formatter: function (e) {
                            return "$" + e + " thousands"
                        }
                    }
                },
                colors: [r, i, c],
                grid: {borderColor: o, strokeDashArray: 4, yaxis: {lines: {show: !0}}},
                markers: {colors: [l, n, h], strokeColor: [r, i, c], strokeWidth: 3}
            }).render()
        }(), function () {
            var e = document.getElementById("kt_charts_widget_8_chart"), t = parseInt(KTUtil.css(e, "height")),
                a = KTUtil.getCssVariableValue("--bs-gray-500"), o = KTUtil.getCssVariableValue("--bs-gray-200"),
                s = KTUtil.getCssVariableValue("--bs-gray-300"), r = KTUtil.getCssVariableValue("--bs-warning"),
                l = KTUtil.getCssVariableValue("--bs-light-warning"), i = KTUtil.getCssVariableValue("--bs-success"),
                n = KTUtil.getCssVariableValue("--bs-light-success"), c = KTUtil.getCssVariableValue("--bs-primary"),
                h = KTUtil.getCssVariableValue("--bs-light-primary");
            e && new ApexCharts(e, {
                series: [{name: "Net Profit", data: [30, 30, 50, 50, 35, 35]}, {
                    name: "Revenue",
                    data: [55, 20, 20, 20, 70, 70]
                }, {name: "Expenses", data: [60, 60, 40, 40, 30, 30]}],
                chart: {
                    fontFamily: "inherit",
                    type: "area",
                    height: t,
                    toolbar: {show: !1},
                    zoom: {enabled: !1},
                    sparkline: {enabled: !0}
                },
                plotOptions: {},
                legend: {show: !1},
                dataLabels: {enabled: !1},
                fill: {type: "solid", opacity: 1},
                stroke: {curve: "smooth", show: !0, width: 2, colors: [r, i, c]},
                xaxis: {
                    x: 0,
                    offsetX: 0,
                    offsetY: 0,
                    padding: {left: 0, right: 0, top: 0},
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    axisBorder: {show: !1},
                    axisTicks: {show: !1},
                    labels: {show: !1, style: {colors: a, fontSize: "12px"}},
                    crosshairs: {show: !1, position: "front", stroke: {color: s, width: 1, dashArray: 3}},
                    tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                },
                yaxis: {
                    y: 0,
                    offsetX: 0,
                    offsetY: 0,
                    padding: {left: 0, right: 0},
                    labels: {show: !1, style: {colors: a, fontSize: "12px"}}
                },
                states: {
                    normal: {filter: {type: "none", value: 0}},
                    hover: {filter: {type: "none", value: 0}},
                    active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                },
                tooltip: {
                    style: {fontSize: "12px"}, y: {
                        formatter: function (e) {
                            return "$" + e + " thousands"
                        }
                    }
                },
                colors: [l, n, h],
                grid: {borderColor: o, strokeDashArray: 4, padding: {top: 0, bottom: 0, left: 0, right: 0}},
                markers: {colors: [r, i, c], strokeColor: [r, i, c], strokeWidth: 3}
            }).render()
        }(), function () {
            var e, t, a, o = document.querySelectorAll(".mixed-widget-2-chart"),
                s = KTUtil.getCssVariableValue("--bs-gray-500"), r = KTUtil.getCssVariableValue("--bs-gray-200");
            [].slice.call(o).map((function (o) {
                a = parseInt(KTUtil.css(o, "height")), e = KTUtil.getCssVariableValue("--bs-" + o.getAttribute("data-kt-color")), t = KTUtil.colorDarken(e, 15), new ApexCharts(o, {
                    series: [{name: "Net Profit", data: [30, 45, 32, 70, 40, 40, 40]}],
                    chart: {
                        fontFamily: "inherit",
                        type: "area",
                        height: a,
                        toolbar: {show: !1},
                        zoom: {enabled: !1},
                        sparkline: {enabled: !0},
                        dropShadow: {
                            enabled: !0,
                            enabledOnSeries: void 0,
                            top: 5,
                            left: 0,
                            blur: 3,
                            color: t,
                            opacity: .5
                        }
                    },
                    plotOptions: {},
                    legend: {show: !1},
                    dataLabels: {enabled: !1},
                    fill: {type: "solid", opacity: 0},
                    stroke: {curve: "smooth", show: !0, width: 3, colors: [t]},
                    xaxis: {
                        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                        axisBorder: {show: !1},
                        axisTicks: {show: !1},
                        labels: {show: !1, style: {colors: s, fontSize: "12px"}},
                        crosshairs: {show: !1, position: "front", stroke: {color: r, width: 1, dashArray: 3}}
                    },
                    yaxis: {min: 0, max: 80, labels: {show: !1, style: {colors: s, fontSize: "12px"}}},
                    states: {
                        normal: {filter: {type: "none", value: 0}},
                        hover: {filter: {type: "none", value: 0}},
                        active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                    },
                    tooltip: {
                        style: {fontSize: "12px"}, y: {
                            formatter: function (e) {
                                return "$" + e + " thousands"
                            }
                        }, marker: {show: !1}
                    },
                    colors: ["transparent"],
                    markers: {colors: [e], strokeColor: [t], strokeWidth: 3}
                }).render()
            }))
        }(), function () {
            var e = document.querySelectorAll(".mixed-widget-3-chart");
            [].slice.call(e).map((function (e) {
                var t = parseInt(KTUtil.css(e, "height"));
                if (e) {
                    var a = e.getAttribute("data-kt-chart-color"), o = KTUtil.getCssVariableValue("--bs-gray-800"),
                        s = KTUtil.getCssVariableValue("--bs-gray-300"), r = KTUtil.getCssVariableValue("--bs-" + a),
                        l = KTUtil.getCssVariableValue("--bs-light-" + a);
                    new ApexCharts(e, {
                        series: [{name: "Net Profit", data: [30, 25, 45, 30, 55, 55]}],
                        chart: {
                            fontFamily: "inherit",
                            type: "area",
                            height: t,
                            toolbar: {show: !1},
                            zoom: {enabled: !1},
                            sparkline: {enabled: !0}
                        },
                        plotOptions: {},
                        legend: {show: !1},
                        dataLabels: {enabled: !1},
                        fill: {type: "solid", opacity: 1},
                        stroke: {curve: "smooth", show: !0, width: 3, colors: [r]},
                        xaxis: {
                            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                            axisBorder: {show: !1},
                            axisTicks: {show: !1},
                            labels: {show: !1, style: {colors: o, fontSize: "12px"}},
                            crosshairs: {show: !1, position: "front", stroke: {color: s, width: 1, dashArray: 3}},
                            tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                        },
                        yaxis: {min: 0, max: 60, labels: {show: !1, style: {colors: o, fontSize: "12px"}}},
                        states: {
                            normal: {filter: {type: "none", value: 0}},
                            hover: {filter: {type: "none", value: 0}},
                            active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                        },
                        tooltip: {
                            style: {fontSize: "12px"}, y: {
                                formatter: function (e) {
                                    return "$" + e + " thousands"
                                }
                            }
                        },
                        colors: [l],
                        markers: {colors: [l], strokeColor: [r], strokeWidth: 3}
                    }).render()
                }
            }))
        }(), function () {
            var e = document.querySelectorAll(".mixed-widget-4-chart");
            [].slice.call(e).map((function (e) {
                var t = parseInt(KTUtil.css(e, "height"));
                if (e) {
                    var a = e.getAttribute("data-kt-chart-color"), o = KTUtil.getCssVariableValue("--bs-" + a),
                        s = KTUtil.getCssVariableValue("--bs-light-" + a),
                        r = KTUtil.getCssVariableValue("--bs-gray-700");
                    new ApexCharts(e, {
                        series: [74],
                        chart: {fontFamily: "inherit", height: t, type: "radialBar"},
                        plotOptions: {
                            radialBar: {
                                hollow: {margin: 0, size: "65%"},
                                dataLabels: {
                                    showOn: "always",
                                    name: {show: !1, fontWeight: "700"},
                                    value: {
                                        color: r,
                                        fontSize: "30px",
                                        fontWeight: "700",
                                        offsetY: 12,
                                        show: !0,
                                        formatter: function (e) {
                                            return e + "%"
                                        }
                                    }
                                },
                                track: {background: s, strokeWidth: "100%"}
                            }
                        },
                        colors: [o],
                        stroke: {lineCap: "round"},
                        labels: ["Progress"]
                    }).render()
                }
            }))
        }(), function () {
            var e = document.querySelectorAll(".mixed-widget-5-chart");
            [].slice.call(e).map((function (e) {
                var t = parseInt(KTUtil.css(e, "height"));
                if (e) {
                    var a = e.getAttribute("data-kt-chart-color"), o = KTUtil.getCssVariableValue("--bs-gray-800"),
                        s = KTUtil.getCssVariableValue("--bs-gray-300"), r = KTUtil.getCssVariableValue("--bs-" + a),
                        l = KTUtil.getCssVariableValue("--bs-light-" + a);
                    new ApexCharts(e, {
                        series: [{name: "Net Profit", data: [30, 30, 60, 25, 25, 40]}],
                        chart: {
                            fontFamily: "inherit",
                            type: "area",
                            height: t,
                            toolbar: {show: !1},
                            zoom: {enabled: !1},
                            sparkline: {enabled: !0}
                        },
                        plotOptions: {},
                        legend: {show: !1},
                        dataLabels: {enabled: !1},
                        fill: {
                            type: "gradient",
                            opacity: 1,
                            gradient: {
                                type: "vertical",
                                shadeIntensity: .5,
                                gradientToColors: void 0,
                                inverseColors: !0,
                                opacityFrom: 1,
                                opacityTo: .375,
                                stops: [25, 50, 100],
                                colorStops: []
                            }
                        },
                        stroke: {curve: "smooth", show: !0, width: 3, colors: [r]},
                        xaxis: {
                            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                            axisBorder: {show: !1},
                            axisTicks: {show: !1},
                            labels: {show: !1, style: {colors: o, fontSize: "12px"}},
                            crosshairs: {show: !1, position: "front", stroke: {color: s, width: 1, dashArray: 3}},
                            tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                        },
                        yaxis: {min: 0, max: 65, labels: {show: !1, style: {colors: o, fontSize: "12px"}}},
                        states: {
                            normal: {filter: {type: "none", value: 0}},
                            hover: {filter: {type: "none", value: 0}},
                            active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                        },
                        tooltip: {
                            style: {fontSize: "12px"}, y: {
                                formatter: function (e) {
                                    return "$" + e + " thousands"
                                }
                            }
                        },
                        colors: [l],
                        markers: {colors: [l], strokeColor: [r], strokeWidth: 3}
                    }).render()
                }
            }))
        }(), function () {
            var e = document.querySelectorAll(".mixed-widget-6-chart");
            [].slice.call(e).map((function (e) {
                var t = parseInt(KTUtil.css(e, "height"));
                if (e) {
                    var a = e.getAttribute("data-kt-chart-color"), o = KTUtil.getCssVariableValue("--bs-gray-800"),
                        s = KTUtil.getCssVariableValue("--bs-gray-300"), r = KTUtil.getCssVariableValue("--bs-" + a),
                        l = KTUtil.getCssVariableValue("--bs-light-" + a);
                    new ApexCharts(e, {
                        series: [{name: "Net Profit", data: [30, 25, 45, 30, 55, 55]}],
                        chart: {
                            fontFamily: "inherit",
                            type: "area",
                            height: t,
                            toolbar: {show: !1},
                            zoom: {enabled: !1},
                            sparkline: {enabled: !0}
                        },
                        plotOptions: {},
                        legend: {show: !1},
                        dataLabels: {enabled: !1},
                        fill: {type: "solid", opacity: 1},
                        stroke: {curve: "smooth", show: !0, width: 3, colors: [r]},
                        xaxis: {
                            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                            axisBorder: {show: !1},
                            axisTicks: {show: !1},
                            labels: {show: !1, style: {colors: o, fontSize: "12px"}},
                            crosshairs: {show: !1, position: "front", stroke: {color: s, width: 1, dashArray: 3}},
                            tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                        },
                        yaxis: {min: 0, max: 60, labels: {show: !1, style: {colors: o, fontSize: "12px"}}},
                        states: {
                            normal: {filter: {type: "none", value: 0}},
                            hover: {filter: {type: "none", value: 0}},
                            active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                        },
                        tooltip: {
                            style: {fontSize: "12px"}, y: {
                                formatter: function (e) {
                                    return "$" + e + " thousands"
                                }
                            }
                        },
                        colors: [l],
                        markers: {colors: [l], strokeColor: [r], strokeWidth: 3}
                    }).render()
                }
            }))
        }(), function () {
            var e = document.querySelectorAll(".mixed-widget-7-chart");
            [].slice.call(e).map((function (e) {
                var t = parseInt(KTUtil.css(e, "height"));
                if (e) {
                    var a = e.getAttribute("data-kt-chart-color"), o = KTUtil.getCssVariableValue("--bs-gray-800"),
                        s = KTUtil.getCssVariableValue("--bs-gray-300"), r = KTUtil.getCssVariableValue("--bs-" + a),
                        l = KTUtil.getCssVariableValue("--bs-light-" + a);
                    new ApexCharts(e, {
                        series: [{name: "Net Profit", data: [15, 25, 15, 40, 20, 50]}],
                        chart: {
                            fontFamily: "inherit",
                            type: "area",
                            height: t,
                            toolbar: {show: !1},
                            zoom: {enabled: !1},
                            sparkline: {enabled: !0}
                        },
                        plotOptions: {},
                        legend: {show: !1},
                        dataLabels: {enabled: !1},
                        fill: {type: "solid", opacity: 1},
                        stroke: {curve: "smooth", show: !0, width: 3, colors: [r]},
                        xaxis: {
                            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                            axisBorder: {show: !1},
                            axisTicks: {show: !1},
                            labels: {show: !1, style: {colors: o, fontSize: "12px"}},
                            crosshairs: {show: !1, position: "front", stroke: {color: s, width: 1, dashArray: 3}},
                            tooltip: {enabled: !0, formatter: void 0, offsetY: 0, style: {fontSize: "12px"}}
                        },
                        yaxis: {min: 0, max: 60, labels: {show: !1, style: {colors: o, fontSize: "12px"}}},
                        states: {
                            normal: {filter: {type: "none", value: 0}},
                            hover: {filter: {type: "none", value: 0}},
                            active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                        },
                        tooltip: {
                            style: {fontSize: "12px"}, y: {
                                formatter: function (e) {
                                    return "$" + e + " thousands"
                                }
                            }
                        },
                        colors: [l],
                        markers: {colors: [l], strokeColor: [r], strokeWidth: 3}
                    }).render()
                }
            }))
        }(), function () {
            var e, t, a, o = document.querySelectorAll(".mixed-widget-10-chart"),
                s = KTUtil.getCssVariableValue("--bs-gray-500"), r = KTUtil.getCssVariableValue("--bs-gray-200"),
                l = KTUtil.getCssVariableValue("--bs-gray-300");
            [].slice.call(o).map((function (o) {
                e = o.getAttribute("data-kt-color"), t = parseInt(KTUtil.css(o, "height")), a = KTUtil.getCssVariableValue("--bs-" + e), new ApexCharts(o, {
                    series: [{
                        name: "Net Profit",
                        data: [50, 60, 70, 80, 60, 50, 70, 60]
                    }, {name: "Revenue", data: [50, 60, 70, 80, 60, 50, 70, 60]}],
                    chart: {fontFamily: "inherit", type: "bar", height: t, toolbar: {show: !1}},
                    plotOptions: {bar: {horizontal: !1, columnWidth: ["50%"], endingShape: "rounded"}},
                    legend: {show: !1},
                    dataLabels: {enabled: !1},
                    stroke: {show: !0, width: 2, colors: ["transparent"]},
                    xaxis: {
                        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
                        axisBorder: {show: !1},
                        axisTicks: {show: !1},
                        labels: {style: {colors: s, fontSize: "12px"}}
                    },
                    yaxis: {y: 0, offsetX: 0, offsetY: 0, labels: {style: {colors: s, fontSize: "12px"}}},
                    fill: {type: "solid"},
                    states: {
                        normal: {filter: {type: "none", value: 0}},
                        hover: {filter: {type: "none", value: 0}},
                        active: {allowMultipleDataPointsSelection: !1, filter: {type: "none", value: 0}}
                    },
                    tooltip: {
                        style: {fontSize: "12px"}, y: {
                            formatter: function (e) {
                                return "$" + e + " revenue"
                            }
                        }
                    },
                    colors: [a, l],
                    grid: {padding: {top: 10}, borderColor: r, strokeDashArray: 4, yaxis: {lines: {show: !0}}}
                }).render()
            }))
        }(), (i = document.querySelector("#kt_forms_widget_1_form")) && i && new Quill("#kt_forms_widget_1_editor", {
            modules: {toolbar: {container: "#kt_forms_widget_1_editor_toolbar"}},
            placeholder: "What is on your mind ?",
            theme: "snow"
        }), n = document.querySelector("#kt_widget_5_load_more_btn"), c = document.querySelector("#kt_widget_5"), n && n.addEventListener("click", (function (e) {
            e.preventDefault(), n.setAttribute("data-kt-indicator", "on"), setTimeout((function () {
                n.removeAttribute("data-kt-indicator"), c.classList.remove("d-none"), n.classList.add("d-none"), KTUtil.scrollTo(c, 200)
            }), 2e3)
        })), (h = document.querySelector("#kt_user_follow_button")) && h.addEventListener("click", (function (e) {
            e.preventDefault(), h.setAttribute("data-kt-indicator", "on"), h.disabled = !0, h.classList.contains("btn-success") ? setTimeout((function () {
                h.removeAttribute("data-kt-indicator"), h.classList.remove("btn-success"), h.classList.add("btn-light"), h.querySelector(".svg-icon").classList.add("d-none"), h.querySelector(".indicator-label").innerHTML = "Follow", h.disabled = !1
            }), 1500) : setTimeout((function () {
                h.removeAttribute("data-kt-indicator"), h.classList.add("btn-success"), h.classList.remove("btn-light"), h.querySelector(".svg-icon").classList.remove("d-none"), h.querySelector(".indicator-label").innerHTML = "Following", h.disabled = !1
            }), 1e3)
        }))
    }
};
"undefined" != typeof module && (module.exports = KTWidgets), KTUtil.onDOMContentLoaded((function () {
    KTWidgets.init()
}));