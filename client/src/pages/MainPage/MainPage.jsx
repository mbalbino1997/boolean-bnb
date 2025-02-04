import HouseList from "../../components/HouseList/Houselist";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from './MainPage.module.css';
import HeaderMain from "../../components/HeaderMain/HeaderMain"


export default function MainPage() {

    return (
        <div className={style.mainpage} >
            <HeaderMain />
            <SearchBar />
            <HouseList />
        </div>
    )
}