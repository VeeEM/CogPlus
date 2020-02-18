function Text(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = "20pt Arial";
    this.update = function(){};
    this.draw = function(context){
        context.font = this.font;
        context.fillText(this.text, this.x, this.y);
    };
}
