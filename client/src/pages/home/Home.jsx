import { Header } from "../../Components/header/Header";
import { Navbar } from "../../Components/navbar/Navbar";
import { Featured } from "../../Components/featured/Featured";
import { FeaturedProperties } from "../../Components/featuredProperties/FeaturedProperties";
import "./home.css"
import { PropertyList } from "../../Components/propertyList/PropertyList";
import { MailList } from "../../Components/mailList/MailList";
import { Footer } from "../../Components/footer/Footer";

export const Home = () => {
  return (
    <div >
        <Navbar />
        <Header />
        <div className="homeContainer"> 
          <Featured />
          <h1 className="homeTitle">
            Browse by property name
          </h1>
          <PropertyList />
          <h1 className="homeTitle">
            Home guests love
          </h1>
          <FeaturedProperties />
          <MailList />
          <Footer />
        </div>
    </div>
  )
}
