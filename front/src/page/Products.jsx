import { useEffect } from "react";
import { useState } from "react";
import api_fetch from "@/api_fetch.js";

const Page = () => {
  const [ cats, setCats ] = useState([]);
  const [ tags, setTags ] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ catFilter, setCatFilter ] = useState( "" );
  const [ tagFilter, setTagFilter ] = useState( "" );

  let foundProducts = products;
  foundProducts = catFilter ? foundProducts.filter( v => v.category.id == catFilter) : foundProducts;
  foundProducts = tagFilter ? foundProducts.filter( v => v.tags.find( t => t.id == tagFilter ) ) : foundProducts;

  useEffect( () => {
    const fetchProducts = async () => {
      const resp = await api_fetch("/products", "GET");
      const error = resp?.error;
      if( error) {
        return;
      }                        
      const products = resp?.products ?? [];
      const tags = [];
      const cats = [];
      products.forEach( v => { 
        const product_cat = v?.category ?? undefined;
        if( product_cat ) {
          const cat_name = (product_cat ?? "").trim();          
          const cat_id = cat_name.toLowerCase();
          const cat_found = cats.find( v => v.id === cat_id );                              
          if(! cat_found ) {            
            v.category = { id: cat_id, name: cat_name };
            cats.push( v.category );            
          } else {
            v.category = cat_found;
          }          
        }
        v.tags = (v?.tags ?? "").split(",") ?? [];
        const product_tags = v.tags;
        product_tags.forEach( (t, index) => {
          const tag_name = (t ?? "").trim();
          const tag_id = tag_name.trim().toLowerCase();
          const tag = { id: tag_id, name: tag_name };          
          const tag_found = tags.find( v => v.id === tag_id );          
          if(tag_id.length > 0 && ! tag_found) tags.push( tag );                    
          v.tags[index] = tag;
        })
        setCats( cats );
        setTags( tags );
      })


      setProducts( products );
    }
    
    fetchProducts();
  }, [])

  return (
    <>
    <h1>Меню</h1>    
    <div className="flex flex-col">
      <div>
        <span>Выбор категории: </span>
        <select value={ catFilter ?? "" } onInput={ (e) => { setCatFilter( e.target.value ) } } >
          <option value="">Все</option>
          { cats.map( v => { 
            return (
              <option key={v.id} value={v.id}>{v.name}</option>
            )
          })}        
        </select>
      </div>
      <div>
        <span>Выбор опции: </span>
        <select value={ tagFilter ?? "" } onInput={ (e) => { setTagFilter( e.target.value ) } } >
          <option value="">Все</option>
          { tags.map( v => { 
            return (
              <option key={v.id} value={v.id}>{v.name}</option>
            )
          })}        
        </select>
      </div>
    </div>
    <div><button onClick={(e) => { e.preventDefault(); setCatFilter(""); setTagFilter(""); }}>Сброс</button></div>
    { foundProducts.length < 1 && <div>Ничего не найдено</div> }
    <div className="flex flex-row flex-wrap -mx-2">
    { foundProducts.map( (v) => { 
      return (
        <div key={v._id} className="flex flex-col w-full md:w-1/3 p-2">
          <h3>{ v.name ?? "" }</h3>          
          <img src={"/".concat(v.image)} alt={v.name ?? ""}/>
          <div>Состав</div>
          <div>{ v.text ?? "" }</div>
          <div><span>{ (1 * (v.price ?? 0)).toFixed(2) }</span><span> руб.</span></div>
        </div>
      )
    })}      
    </div>
    </>
  )
}

export default Page;