import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import { ApolloProvider } from '@apollo/client';

import { client } from './http'

import { Routing } from './routing'

import './styles/styles.css'
import './styles/icons.css'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routing />
  </ApolloProvider>,
  document.getElementById('root')
)
