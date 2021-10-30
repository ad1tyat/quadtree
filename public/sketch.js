let qtree;
let button;
let showRec = 0;
function setup() {
  createCanvas(600, 600);
  let boundary = new Rectangle( 250, 250, 250, 250);
  qtree = new QuadTree(boundary, 4);

  button = createButton("Clear");
  button.mouseClicked(ClearButton);
  button.size(200,100);
  button.position(750,200);

  button2 = createButton("Random");
  button2.mouseClicked(RandomPoints);
  button2.size(200,100);
  button2.position(750,400);
  // button.style("font-family", "Bodoni");
  // button.style("font-size", "48px");

  slider = createSlider(1, 10, 3);
  slider.position(750, 150);
  slider.style('width', '200px');
  slider.style('label','How')


  slider2 = createSlider(25, 50, 25);
  slider2.position(750, 550);
  slider2.style('width', '200px');
  slider2.style('label','How')

  button3 = createButton("Count In Range");
  button3.mouseClicked(CountInRange);
  button3.size(200,100);
  button3.position(750,600);
  
}

function draw() {

  fill(255);
  rectMode(CENTER);
  stroke(255);
  rect(300, 300, 600, 600)
  fill(0,12,34);
  rectMode(CENTER);
  rect(250, 250, 500, 500)
  qtree.show();
  stroke(0, 255, 0);
  rectMode(CENTER);
  let sz = slider2.value();
  let range = new Rectangle(mouseX, mouseY, sz, sz);
  let f = 1;
  let pts = 0;



  if(mouseIsPressed && insideRect()){
    let val = slider.value();
    f = 0;
    for(let id = 0;id<val;id++){
      let x = randomGaussian(-5, +5);
      let y = randomGaussian(-5, +5);
      let m = new Point(mouseX + x, mouseY + y);
      qtree.insert(m);   
    }
    // To avoid multiple points on single mouse click 
    for(let delay = 0; delay <1000;) {delay++;}
  }
  if(showRec == 1){
  // This check has been introduced due to a bug discussed in https://github.com/CodingTrain/website/pull/556
    if (mouseX < 500 && mouseY < 500) {
      rect(range.x, range.y, range.w * 2, range.h * 2);
      let points = qtree.query(range);
      for (let p of points) {
        strokeWeight(4);
        point(p.x, p.y);
      }

      pts = points.length;
      
    textSize(20);
    // fill();
    let sentence = "There are " + pts + " points in the selected square";
    // console.log(sentence);
    
    fill(0);
    text(sentence, 50, 550); // Text wraps within text box
    
    }
  }
}
function CountInRange() {
  if(!showRec){
    button3.style('background-color', '#4CAF50');
  }else{
    button3.style('background-color', '#e7e7e7');
  }
  showRec = 1 - showRec;

}
function ClearButton() {
  qtree.clear();
}
function RandomPoints() {
  qtree.clear();
  for (let i = 0; i < 300; i++) {
    let x = randomGaussian(500 / 2, 500 / 8);
    let y = randomGaussian(500 / 2, 500 / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}
function insideRect(){
  let x = mouseX;
  let y = mouseY;
  return (x>=0 && x<=600 && y>=0 && y<600);
}
