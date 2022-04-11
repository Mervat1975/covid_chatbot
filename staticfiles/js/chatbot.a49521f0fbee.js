$(document).ready(function () {
    //Toggle fullscreen
    $(".chat-bot-icon").click(function (e) {
        $(this).children('img').toggleClass('hide');
        $(this).children('svg').toggleClass('animate');
        $('.chat-screen').toggleClass('show-chat');

    });
    $('.chat-mail button').click(function () {
        $('.chat-mail').addClass('hide');
        $('.chat-body').removeClass('hide');
        $('.chat-input').removeClass('hide');
        $('#yes-no').hide()
        $('.chat-header-option').removeClass('hide');
    });
    $('.end-chat').click(function () {
        $('.chat-body').addClass('hide');
        $('.chat-input').addClass('hide');
        $('.chat-session-end').removeClass('hide');
        $('.chat-header-option').addClass('hide');
    });

    function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    function GetTodayDate() {

        // Monday, 1:27 PM
        let tdate = new Date();

        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let ntime = tdate.getHours() + ":" + tdate.getMinutes();
        let ampm = tdate.getHours() >= 12 ? 'PM' : 'AM';
        let day = weekday[tdate.getDay()]
        return day + ', ' + ntime + ' ' + ampm;
    }

    $(".chat-start").html(GetTodayDate());
    $("#startchat").click(function () {
        $("#startMessage").html(" Hi there ,This Robo, AI robot. Well, let's negotiate?");
    });

    $(".chat-bot-icon").click()
    jQuery('#chatbody').css("overflow-y", "scroll");

    // cookie for POST request
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');

    $("#getdisc").click(function () {
        if ($("#getdisc").is(':checked'))
            $('#disc2').val($('#disc').text())
        else
            $('#disc2').val("0.00%")



        //window.alert($('#disc').val())
    });

    $("#rad-yes").click(function () {
        $("#message").val("Yes");
    });
    $("#rad-no").click(function () {
        $("#message").val("No");
    });

    $("#sendmessage").click(function () {
        console.log('ai_response')
        const value = $("#message").val();

        $.ajax({
            type: "POST",
            url: "/",
            headers: {
                "X-CSRFToken": csrftoken
            },
            data: JSON.stringify({ "message": value }),
            success: (response) => {
                ai_response = ""


                ai_response += response['message']['text']

                console.log('ai_response', ai_response)


                wait(1000)
                $("#bubble").addClass('hide');
                $("#bubble").removeAttr("id")


                $('.chat-body').append('<div class="chat-bubble you">' + ai_response + '</div>');
                $('.chat-body').animate({ scrollTop: $('.chat-body').height() }, 1000);

            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });

        $('.chat-body').append('<div class="chat-bubble me">' + $('#message').val() + '</div>');
        $('#message').val("");

        const bubble = '  <div  id="bubble" class="chat-bubble you">' +
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
            ' style="margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;"' +
            'viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">' +
            '<circle cx="0" cy="44.1678" r="15" fill="#ffffff">' +
            '<animate attributeName="cy" calcMode="spline"' +
            ' keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"' +
            'values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>' +
            '</circle>' +
            '<circle cx="45" cy="43.0965" r="15" fill="#ffffff">' +
            '<animate attributeName="cy" calcMode="spline"' +
            'keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"' +
            'values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s">' +
            '</animate>' +
            ' </circle>' +
            '<circle cx="90" cy="52.0442" r="15" fill="#ffffff">' +
            '<animate attributeName="cy" calcMode="spline"' +
            'keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"' +
            'values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s">' +
            '</animate>' +
            '</circle>' +
            '</svg>' +
            '</div>';


        $(".chat-body").append(bubble);


    });

});

