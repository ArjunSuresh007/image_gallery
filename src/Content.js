import React from 'react'
import { Box } from '@mui/system'
import {Container} from '@mui/system'
import { ImageList,Typography,ImageListItem,ImageListItemBar, Checkbox, Toolbar, IconButton, } from '@mui/material'
import {createApi} from 'unsplash-js'
import {useState,useEffect} from 'react'
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'
import {saveAs} from 'file-saver';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import {useMediaQuery} from '@mui/material'
import {Skeleton} from '@mui/material'




let favourites = {}

let key = 'LcuEUHZHR40jU5GO6xcdG74WedNNssui-ceKOofPDEs';
let unsplash = createApi({
  accessKey: key,
  fetch:fetch
})




function Content() {
  const matches = useMediaQuery('(max-width:600px)');
    let [state,setState] = useState([])
    let [modal,setModal] = useState(false)
    let [data,setData] = useState([])
    let [show,setShow] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height:'auto',
        bgcolor: 'background.paper',
      };

    useEffect(()=>{
        unsplash.search.getPhotos({
          query:'lion',
          perPage:20,
          }).then(data =>{console.log(data); setState(data.response.results)})
                    
    },[])

useEffect(()=>{return(
    window.addEventListener('click',(event)=>{
        if(event.target.className === 'MuiImageListItem-img'){
            setModal(true)
            setData(event.target)
          }
    }))},[])


    

useEffect(() => {
  return () => {
    window.addEventListener('submit',(e)=>{
      let a = document.getElementsByTagName('input')[0].value
      unsplash.search.getPhotos({
        query:a,
        perPage:20,
        }).then(data =>{console.log(data); setState(data.response.results)})    
      })
  }
}, [])


    let download_Handler =()=>{
      saveAs(state[data.id].urls.regular,state[data.id].user.name)
    }

    let favourites_Handler =()=>{
      state[data.id].check = !state[data.id].check
      if(state[data.id].check === true){
        favourites[data.id] = state[data.id]
      }else{
        delete favourites[data.id]
      }
      console.log(favourites)
    }


  return (
    <Box >
       <Modal
        open={modal}
        onClose={()=>setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Card sx={{

        }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height='380'
        width='90'
        image={data.src}
        sx={{
          backgroundSize:'cover',
          backgroundPosition:'center'
        }}
      />
        <Toolbar variant='dense' sx={{display:'flex',justifyContent:'space-between'}} >
      <CardContent >

      <Avatar alt="Remy Sharp" src={state[data.id]?.user.profile_image.small} />
        <Typography gutterBottom variant="h6" component="h6" sx={{
          textTransform:'capitalize',
          mx:'4px',
        }}>
            {state[data.id]?.user.name}
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" color="error" size='small' onClick={download_Handler}> Download</Button>
      <Checkbox icon={ <StarBorderIcon color='error' />} checkedIcon={<StarIcon color='error'/>} 
      onClick={favourites_Handler}/>
      </CardActions>
          </Toolbar>
    </Card>
          
        </Box>
 </Modal>
      <Modal
      open={show}
        onClose={()=>setShow(false)}
        aria-labelledby="modal-modal-fav_card"
        >
          <Box sx={style}>
   <ImageList  variant='masonry' rowHeight={150}
   >
    {
      Object.values(favourites).map((item,index)=>{
        return(
          <ImageListItem key={index}>
            <img
              src={`${item.urls.regular}?w=150&h=150&fit=crop&auto=format`}
              srcSet={`${item.img}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
              alt={item.alt_description}
              loading="lazy"
            />
          </ImageListItem>)
      })
    }
</ImageList>
</Box>
      </Modal>
          <Container>
        <ImageList 
    variant="masonry" cols={matches? 1 : 3} gap={20} >
        {state.length !== 0  ? state.map((item,index)=>{
          item.check = false;
            return(
                <ImageListItem key={index} >
                <img
                  src={`${item.urls.raw}?w=250&fit=crop&auto=format`}
                  alt={item.alt_description}
                  id={index}
                  loading="lazy"
                  
                />
                <ImageListItemBar
                id={index}
                  subtitle={<div>
                    <span>{item.user.name}</span><br></br>
                    <span>
                    <Checkbox icon={ <FavoriteBorderIcon color='error' />} checkedIcon={<FavoriteIcon color='error'/>}  />{item.likes}
                      </span>
                    </div>}
                />
              </ImageListItem>
            )
        }): 
        <Skeleton
  sx={{ width:'90vw',height:'90vh' }}
  variant="rectangular"
  animation='wave'
/>
          }
    </ImageList>
    </Container>
        <IconButton sx={{position:'fixed',bottom:20,left:40,}} size='large' color='error' onClick={()=>{setShow(true)}}>
      <BeenhereIcon size='large' />
</IconButton>
    </Box>

  )
}

export default Content