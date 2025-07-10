import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"


const appUtils = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const selector = useSelector
  return {
    navigate,
    dispatch,
    selector,
    location
  }
}
export default appUtils;
