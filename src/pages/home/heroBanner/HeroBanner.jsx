import React,{useState,useEffect} from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadingImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


const HeroBanner = () => {

	const [backGround,setBackGround] = useState("");
	const [query,setQuery] = useState("");
	const navigate = useNavigate();
	const {url} = useSelector((state)=>state.home);
	const {data,loading} = useFetch("/movie/upcoming");
	//console.log("UPcoming movies data",data);

	useEffect(()=>
	{
		const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
		setBackGround(bg);
	},[data]);

	//console.log("Backgroud image path is ",backGround);
	const searchQueryHandler = (event)=>
	{
		if(event.key === "Enter" && query.length > 0)
		{
			navigate(`/search/${query}`);
		}
	}


  return (
    <div className='heroBanner'>
	{!loading && <div className='backdrop-img'>
		<Img src={backGround} />
	</div>}
	<div className='opacity-layer'></div>
	<ContentWrapper>
	
		<div className='heroBannerContent'>
			<span className='title'>Welcome</span>
			<span className='subTitle'>
				Millions of Movies, TV Shows and People to Discover. Explore Now
			</span>
			<div className='searchInput'>
				<input
					type="text"
					placeholder='Search for a Movie or TV Show...'
					onKeyUp={searchQueryHandler}
					onChange={(e)=>setQuery(e.target.value)}
				/>
				<button>Search</button>
			</div>
		</div>

	</ContentWrapper>
      
    </div>

  )
}

export default HeroBanner