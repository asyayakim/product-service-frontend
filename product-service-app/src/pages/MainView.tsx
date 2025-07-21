import Search from '../components/Search.tsx';


export default function MainView() {
    return (    
      <main className="main-view">
            <h1>Product Search</h1>
            <p className="subtitle">Find products by search</p>
            <Search />
        </main>
    );
}