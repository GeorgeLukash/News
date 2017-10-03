window.onload = function() {
    var news_data = {};

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url: proxy + "https://www.ukr.net/ajax/start.json",
        //url: proxy + "https://newsapi.org/v1/articles?source=techcrunch&apiKey=57b17d6a88f74e0d9707e756f2fa3fdc",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

        crossDomain: true,
        //beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
        beforeSend: function(request) {
            request.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        success: function(data) {
            CreateDOM(data.news);
            this.news_data = data.news;
            console.log(this.news_data);
        }
    });

    var CreateDOM = function(some_data) {
        var load_hide = document.getElementById('loading');
        load_hide.style.display = "none";

        var main = document.getElementById('main');
        for (var i = 0; i < some_data.length; i++) {
            if (some_data[i].items != null) {

                var h1 = document.createElement('H1');
                h1.innerHTML = some_data[i].title;
                h1.className = "news-title";

                var container = document.createElement('div');
                container.className = "container";
                container.appendChild(h1);

                var link_more = document.createElement('A');
                link_more.innerHTML = some_data[i].readMore;
                container.appendChild(link_more);

                if (some_data[i].items != null) {
                    var list = document.createElement('UL');

                    for (var j = 0; j < some_data[i].items.length; j++) {

                        var li = document.createElement('LI');
                        var link = document.createElement('a');
                        var time = document.createElement('SPAN');

                        link.setAttribute("href", some_data[i].items[j].url);
                        link.className = "link";
                        link.innerHTML = some_data[i].items[j].title;
                        time.innerHTML = "  " + some_data[i].items[j].date;
                        li.appendChild(link);
                        li.appendChild(time);
                        list.appendChild(li);
                        container.appendChild(list);
                        main.appendChild(container);

                    }
                }
            }
        }

    };
};