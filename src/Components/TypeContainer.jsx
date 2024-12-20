import Type from "./Type";

const TypeContainer = () => {
    return ( 
        <div className="flex flex-col gap-5 mt-5 border-b-2 pb-4">
            <Type title={"Tshirts"}/>
            <Type title={"Shorts"}/>
            <Type title={"Shirts"}/>
            <Type title={"Hoodie"}/>
            <Type title={"Jeans"}/>
        </div>
     );
}
 
export default TypeContainer;