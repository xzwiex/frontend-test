import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'

import { CheckoutPage } from './pages/CheckoutPage'
import { ProductPage } from './pages/ProductPage'


export function Routing() {
    return (
        <Router>
            <Switch>
                <Route path="/checkout">
                    <CheckoutPage />
                </Route>
                <Route path="/product/:slug">
                    <ProductPage />
                </Route>
                <Redirect
                    to={{
                        pathname: "/product/1000"
                    }}
                />
            </Switch>

        </Router>
    )
}