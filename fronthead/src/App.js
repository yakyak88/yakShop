import Footer from "./components/Footer";
import Header from "./components/Header";
import Product from "./components/Product";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <main className="py-3">
                <div className="container">
                    <h1>Welcome to proshop</h1>
                </div>
                <Product></Product>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default App;
