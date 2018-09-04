var app = {};
app.$btnStart = $('#btnStart');
app.$pages   = {
    intro: $('#intro')
};

console.log(app.$pages)

app.$btnStart.bind("click", function(e) {
    console.log(e);
    app.$pages.intro.hide();
})
