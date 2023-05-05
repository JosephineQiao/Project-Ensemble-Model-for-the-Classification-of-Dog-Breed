$(document).ready(function () {

    var ctx = document.getElementById('qer');
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["First Prediction", "Second Prediction", ["Other 118 Breeds", "(sum of probabilities)"]],
            datasets: [{
                barThickness: 16,
                maxBarThickness: 18,
                minBarLength: 12,
                backgroundColor: ["white", "#999", "#777"],
                data: [90, 8, 2]

            }]
        },
        options: options = {
            legend: { display: false },
            fontColor: 'white',

            scales: {
                yAxes: [{
                    scaleFontSize: 10,
                    scaleLabel: {

                    },
                    ticks: {
                        beginAtZero: true,
                        fontSize: 15,
                        padding: 0,
                        fontColor: '#fff'
                    }
                }],

                xAxes: [{
                    gridLines: {
                        // offsetGridLines: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Probability (%)',
                        fontColor: 'white',
                        // fontSize: '17'
                    },
                    ticks: {
                        max: 100,
                        min: 0,
                        fontColor: 'white',
                        beginAtZero: true,
                        stepSize: 20
                    }
                }]
            },
            title: {
                display: true,
                fontColor: 'white',
                fontSize: 18,
                text: 'The result'
            }
        }
    });



    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    prevran = 1
    $("#randomImage").on('click', function () {
        imgType = "Random"
        document.getElementById("ranButtonIcn").className = "fas fa-spinner fa-spin fa-lg ";
        ran = Math.floor(Math.random() * 9);

        while (ran == prevran) {
            ran = Math.floor(Math.random() * 9);
        }
        prevran = ran
        $("#textinImage").addClass("d-none");
        $("#ranImg").attr("src", './static/randomImg/' + String(ran + 1) + "/" + String(ran + 1) + "/" + String(ran + 1) + '.jpg');
        imgAdd = document.getElementById('ranImg').src

        var inputFile = document.getElementById('upld');
        inputFile.value = imgAdd;

        $('#whiteAreaUpld').css('opacity', '1');

        $("#ranImg").removeClass("d-none");
        $("#ranImg").on('load', function () {
            $('#ranImg').css("width", "100%");
            $('#gryTxt').css("border-width", "1px");
            if (!$("#gryTxt").hasClass("bg-dark"))
                $('#gryTxt').addClass("bg-dark");


            document.getElementById("ranButtonIcn").className = "fas fa-dog fa-lg";

            if (window.innerWidth > 639) {
                $("#ranImg").tooltip('enable');
                $("#ranImg").tooltip('show');
            }
        });


        document.getElementById("run").className = "btn btn-primary  d-flex  justify-content-center align-items-center enabled";


    });


    $("#randomImage").on('click', function () {
        $(this).tooltip('hide')
    })

    $("#spanUpld").on('click', function () {
        $(this).tooltip('hide')
    })

    $('.navbar-toggler').on('click', function () {

    });
    $('.navbar-nav>li>a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });


    //AJAX image upload

    $("#upld").on('change', function (e) {

        var isImage = false;
        var form_data = new FormData($('#form_upld')[0]);
        document.getElementById("upldIcn").className = "fas fa-spinner fa-spin fa-lg mr-2 ";
        var reader = new FileReader();
        var addr = ""
        reader.onload = function (e) {
            addr = e.target.result
        }
        if (this.files[0] != undefined)
            if (this.files[0].type == 'image/jpeg' || this.files[0].type == 'image/jpg' || this.files[0].type == 'image/png') {
                imgType = "Upld"
                $('#ranImg').tooltip('hide');
                document.getElementById("run").className = "btn btn-primary  d-flex  justify-content-center align-items-center disabled";
                document.getElementById("randomImage").disabled = true;
                document.getElementById("upld").disabled = true;

                reader.readAsDataURL(this.files[0]);
                isImage = true;
                $('#randomImage').addClass("d-none");
                $('#cancelUpload').removeClass("d-none");
		$('#cancelUpload').removeClass('disabled');
		document.getElementById("cancelUpload").disabled = false;


            }



        aj = $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable && isImage) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $('#spanUpldInner').html(percentComplete + " % uploaded")
			if (percentComplete >= 95 ) {
			    $('#cancelUpload').addClass('disabled');
			    document.getElementById("cancelUpload").disabled = true;
			}
                        if (percentComplete === 100) {
                            $('#spanUpldInner').html(" Waiting ...")
                            $('#ranImg').tooltip('hide');
                            $('#ranImg').attr('src', addr);
                            $('#ranImg').attr('data-original-title', "New Uploaded Image");
                        }

                    }
                }, false);

                return xhr;
            },
            method: "POST",
            url: "/identify",
            data: form_data,
            contentType: false,
            contentType: false,
            cache: false,
            processData: false
        }).done(function (data) {
            if (data['img'] == "ERROR_extention") {
                document.getElementById("upldIcn").className = "fas fa-upload fa-lg mr-2";
                document.getElementById("run").className = "btn btn-primary  d-flex  justify-content-center align-items-center disabled";
                document.getElementById("buttonModalUpld").click();
                $('#spanUpld').html('<i id="upldIcn" class="fas fa-upload fa-lg mr-1"></i><span id="spanUpldInner">Upload image</span>');

            }
            if (data['img'] != "ERROR_extention") {

                if (data['h'] >= data['w']) {
                    $('#ranImg').css("width", "50%");
                    $('#gryTxt').css("border-width", "0px");
                    $('#gryTxt').removeClass("bg-dark");
                }
                else {
                    $('#ranImg').css("width", "100%");
                    $('#gryTxt').css("border-width", "1px");
                    if (!$("#gryTxt").hasClass("bg-dark"))
                        $('#gryTxt').addClass("bg-dark");
                }
                document.getElementById("randomImage").disabled = false;
                document.getElementById("upld").disabled = false;

                document.getElementById("ranImg").className = "";
                document.getElementById("run").className = "btn btn-primary  d-flex  justify-content-center align-items-center enabled";
                imgAdd = data['img']
                $('#textinImage').addClass("d-none");
                document.getElementById("upldIcn").className = "fas fa-upload fa-lg mr-2";
                $('#spanUpld').html('<i id="upldIcn" class="fas fa-upload fa-lg mr-1"></i><span id="spanUpldInner">Upload image</span>');
                $('#cancelUpload').addClass("d-none");
                $('#randomImage').removeClass("d-none");

                $('#whiteAreaUpld').css('opacity', '1');


            }

        });
    });

    //cancel upload
    $("#cancelUpload").on('click', function (e) {
        aj.abort();
        document.getElementById("upldIcn").className = "fas fa-upload fa-lg mr-2";
        document.getElementById("run").className = "btn btn-primary  d-flex  justify-content-center align-items-center disabled";
        $('#spanUpld').html('<i id="upldIcn" class="fas fa-upload fa-lg mr-1"></i><span id="spanUpldInner">Upload image</span>');
        $('#cancelUpload').addClass("d-none");
        $('#randomImage').removeClass("d-none");
        document.getElementById("randomImage").disabled = false;
        document.getElementById("upld").disabled = false;


    });


    // ajax run
    $("#run").on('click', function (e) {
        var form_data = new FormData($('#form_upld')[0]);

        if ($("#best").hasClass("pleaseShake")) {
            $('#best').removeClass("pleaseShake");
        }

        document.getElementById("runLogo").className = "fas fa-cog  fa-spin fa-lg mr-2";
        $("#run").addClass("btn-info");
        $("#run").removeClass("btn-primary ");

        $.ajax({
          url: '/identify',
          type: 'POST',
          data: form_data,
          processData: false,
          contentType: false,
          success: function (data) {
            console.log(data.breed1);
            console.log(data.prob1);
            console.log(data.breed2);
            console.log(data.prob2);

            $('#best').addClass("pleaseShake");
            document.getElementById("runLogo").className = "fas fa-arrow-alt-circle-right fa-lg mr-2";
            $('#fistChoice').html('<i class="fas fa-check-double mr-2 fa-lg"></i>' + data['breed1']);
            $('#secondChoice').html('<i class="fas fa-check mr-2 fa-lg"></i>' + data['breed2']);
            $('#fistProb').html('<b>' + (data['prob1'] * 100).toFixed(5) + "%" + '</b>');
            $('#secondProb').html('<b>' + (data['prob2'] * 100).toFixed(5) + "%" + '</b>');
            $('#thirdProb').html('<b>' + ((1 - data['prob1'] - data['prob2']) * 100).toFixed(5) + "%" + '</b>');
            document.getElementById("boxRes").innerHTML = " The Best Prediction: " + data['breed1'];

            myBarChart.data.datasets[0].data = [data['prob1'] * 100, data['prob2'] * 100, (1 - data['prob1'] - data['prob2']) * 100];
            myBarChart.data.labels = [data['breed1'], data['breed2'], ["Other 118 Breeds", "(sum of probabilities)"]];


            myBarChart.update();
            myBarChart.resize();
            $("#chck").css("display", "inline");
            $("#NC").css("display", "inline");
            document.getElementById("run").className = "btn btn-info  d-flex  justify-content-center align-items-center disabled";
            $(".yel").css('color', 'yellow');



            // scroll down in small windows
            if (window.innerWidth < 992) {
                //  console.log(window.innerWidth );
                $("header").stop();
                // prevent defualt behavior
                e.preventDefault();
                // const hash = this.hash;
                //console.log(hash);
                //smooth scroll
                $('html,body').animate({
                    scrollTop: 570
                }, 1000);
            }
          },
          error: function (xhr, status, error) {
           document.getElementById("runLogo").className = "fas fa-arrow-alt-circle-right fa-lg mr-2";
           document.getElementById("run").className = "btn btn-info  d-flex  justify-content-center align-items-center disabled";

            console.log(xhr.responseText);
          }
        });

    });
})
