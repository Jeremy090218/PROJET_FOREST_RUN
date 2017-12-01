class Element {
  constructor() {
    if(!Element.id) Element.id = 0;
    ++Element.id;
  }

  getId(){
    return Element.id;
  }
}
