import Card from "../Card/Card"
import { useState } from "react"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { filterCards, orderCards } from "../../Redux/actions"
import styled from "styled-components"


const FilterDiv = styled.div `
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    margin: 0 auto;
    padding: 15px 0;
    width: 23%;
    background-image: linear-gradient(to left, #DA8787, #E1B07E, #434469, #01161E);
    border-radius: 50px
`

const FavCardBox = styled.div `
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;

    margin-top: 1.2rem;
`

const StyledSelect = styled.select `
    padding: 5px;
    appareance: none;
    outline: none;
    background-color: #0D1F2D;
    color: white;
    font-size: 15px;
    font-family: consolas;
    border: none;
    box-shadow: 2px 2px white
`

const Options = styled.option `
    font-size: 15px
`

const Favourites = ({myFavourites}) => {

    const [aux, setAux] = useState(false)

    const dispatch = useDispatch()

        const handleOrder = (event) => {
            dispatch(orderCards(event.target.value))
            setAux(true) 
        }

        const handleFilter = (event) => {
            dispatch(filterCards(event.target.value))
        }

        const handleStatus = (status) => {
            if(status === 'Alive') return true
            else if(status === 'Dead') return false
        }
  
    return (
        <>
            <FilterDiv>
                <StyledSelect onChange = {handleOrder}>
                    <Options value = 'A'>Ascendente</Options>
                    <Options value = 'D'>Descendente</Options>
                </StyledSelect>
                <StyledSelect onChange = {handleFilter}>
                    <Options value = 'Male'>Male</Options>
                    <Options value = 'Female'>Female</Options>
                    <Options value = 'Genderless'>Genderless</Options>
                    <Options value = 'unknown'>Unknown</Options>
                </StyledSelect>
            </FilterDiv>

            <FavCardBox>
            {
                myFavourites?.map(({id, name, status, species, gender, image, onClose}, idx) => {
                    const characterStatus = handleStatus(status)

                    return (    
                        <Card
                            key = {idx}
                            id = {id}
                            name = {name}
                            species = {species}
                            gender = {gender}
                            image = {image}
                            onClose = {onClose}
                            handleFavCharStatus = {characterStatus}
                        />
                    
                    )
                })
            }
            </FavCardBox>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        myFavourites: state.myFavourites
    }
} 

export default connect(
    mapStateToProps,
    null
)(Favourites)