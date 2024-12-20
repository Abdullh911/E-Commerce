import rightDrop from '../assets/rightDrop.svg'
const Type = ({title}) => {
    return ( 
        <div className='w-full flex justify-between'>
            <p className='text-[#00000099]'>{title}</p>
            <img src={rightDrop} alt="" />
        </div>
     );
}
 
export default Type;