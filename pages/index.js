/* eslint-disable @next/next/no-img-element */
import LayoutFullHeight from "../components/layout/fullHeight";
import SlotMachine from "../components/slotMachine/slotMachine";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import config from "../assets/js/config";
import { setList, setLoading, resetList } from '../store/food'
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch()

  const foodList = useSelector(state => state.food.list)
  const loading = useSelector(state => state.food.loading)

  const fetchList = async(payload) => {
    const params = payload ?? {} // if needed
    dispatch(setLoading(true))

    try {
      const response = await axios.get(`${config.baseURL}/api/foods`)
      dispatch(setList({
        ...response.data,
        action: params.action
      }))
    } catch (error) {
      console.error('Error fetching foods', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  // once only
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <LayoutFullHeight>
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center">
        <SlotMachine foods={foodList} />
      </div>
    </LayoutFullHeight>
  )
}
