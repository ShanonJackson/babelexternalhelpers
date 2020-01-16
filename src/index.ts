const iamasync = async () => {
	return "hello i am async"
}
const spread = {...{a: "name", b: "c"}, abc: "hello"};
const templateliteral = `helloworld ${JSON.stringify(spread)}`;
class IAmClass {
	hello = () => "say hello";
	helloprototype() {
		return "hello from the prototype";
	}
}
