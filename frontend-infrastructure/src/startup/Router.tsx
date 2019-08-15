import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'
import { Welcome } from './Welcome';

function Index() {
    return <Welcome/>;
}

const Loading: React.SFC = () => <div>Loading...</div>;

const ProductDetails = loadable(() => import('@service/components/productDetails/Description'), {
    fallback: <Loading />,
})

const ProductList = loadable(() => import('@service/components/productList/Body'), {
    fallback: <Loading />,
})


const AddProduct = loadable(() => import('@service/components/addProduct/Form'), {
    fallback: <Loading />,
})

export function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products/">Products List</Link>
                        </li>
                        <li>
                            <Link to="/form/">Add product</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact component={Index} />
                <Route path="/details/:id" component={ProductDetails} />
                <Route path="/products" render={(props) => <ProductList detailsUrl={'/details'} />} />
                <Route path="/form" render={(props) => <AddProduct redirectUrl={'/products'} />} />
            </div>
        </Router>
    )
}