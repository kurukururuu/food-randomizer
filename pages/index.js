/* eslint-disable @next/next/no-img-element */
import LayoutFullHeight from "../components/layout/fullHeight";
import SlotMachine from "../components/slotMachine/slotMachine";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import config from "../assets/js/config";
import { setList, setLoading, resetList, setTypes, setFilter } from '../store/food'
import { useCallback, useEffect, useState } from "react";
import useWatch from '../hooks/useWatch'

export default function Home() {
  const dispatch = useDispatch()

  const foodList = useSelector(state => state.food.list)
  const foodTypes = useSelector(state => state.food.types)
  const filter = useSelector(state => state.food.filter)
  const loading = useSelector(state => state.food.loading)

  const [selectedType, setSelectedType] = useState([])

  const fetchList = async(payload) => {
    const params = payload ? {...payload, ...filter} : filter // if needed
    dispatch(setLoading(true))

    try {
      const url = `${config.baseURL}/api/foods?${params.type ? `&type=${params.type}` : ''}`
      const response = await axios.get(url)
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

  const fetchTypes = async() => {
    try {
      const response = await axios.get(`${config.baseURL}/api/foods-types`)
      dispatch(setTypes(response.data))
    } catch (error) {
      console.error('Error fetching food types', error)
    }
  }

  const handleSelectedType = useCallback((e) => {
    const found = filter.type.findIndex(v => v === e.target.value)
    const arr = [...filter.type]
    if (found !== -1) {
      arr.splice(found, 1)
      setSelectedType(arr)
    } else {
      arr.push(e.target.value)
      setSelectedType(arr)
    }
    dispatch(setFilter({...filter, type: arr}))
  },[filter])

  useWatch(() => {
    // Fetching logic...
    fetchList()
  }, [ filter ])

  // once only
  useEffect(() => {
    fetchList()
    fetchTypes()
  }, [])

  return (
    <LayoutFullHeight>
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center">
        {/* <div className="text-3xl">Food O'mizer</div> */}
        <div className="mb-6 flex justify-between max-w-xs">
          {foodTypes.data.map((type,idx) => {
            return (
              <label key={idx} className={['flex items-center', idx > 0 ? 'ml-4' : ''].join(' ')}>
                <input value={type} type="checkbox" className="mr-2" onChange={handleSelectedType} />
                <span>{type}</span>
              </label>
            )
          })}
        </div>
        <SlotMachine foods={foodList} />
      </div>
    </LayoutFullHeight>
  )
}
