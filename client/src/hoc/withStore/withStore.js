import React, { useContext } from 'react'
import { StoreContext } from '../../context'

export default function withStore(values = []) {
    return (WrappedComponent) => {
        return (props, ref) => {
            const { get } = useContext(StoreContext)
            return <WrappedComponent {...props} {...get(values)} />
        }
    }
}
