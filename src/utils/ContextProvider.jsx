import { createContext, useContext, useState } from "react"

const StateContext = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [dataUser, setDataUser] = useState(null)
    const [dataProduct, setDataProduct] = useState(null)
    const [dataInfo, setDataInfo] = useState(null)
    const [dataBankDelete, setDataBankDelete] = useState(null)
    const [dataFeeDelete, setDataFeeDelete] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [minimizeSidebar, setMinimizeSidebar] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const [screenSize, setScreenSize] = useState(undefined)
    const [dataContent, setDataContent] = useState(null)
    const [dataBg, setDataBg] = useState(null)

    return (
        <StateContext.Provider value={{
            showDropdown,
            setShowDropdown,
            dataUser,
            setDataUser,
            dataProduct,
            setDataProduct,
            dataInfo,
            setDataInfo,
            minimizeSidebar,
            setMinimizeSidebar,
            screenSize,
            setScreenSize,
            showSidebar,
            setShowSidebar,
            dataBankDelete,
            setDataBankDelete,
            dataFeeDelete,
            setDataFeeDelete,
            dataContent,
            setDataContent,
            dataBg,
            setDataBg
        }}>
            {children}
        </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)