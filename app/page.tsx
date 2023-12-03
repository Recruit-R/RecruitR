'use client'
import { Button } from "@/components/ui/button";
import addData from "./api/testAddData";

export default function Home() {
  const handleForm = async () => {
    const data = {
      name: 'John snow',
      house: 'Stark'
    }
    const { result, error } = await addData('users', 'user-id', data)

    if (error) {
      return console.log(error);
    } else {
      return console.log(result);
    }
  }
  return (
    <div>
      home
      <Button onClick={handleForm}>
        test
      </Button>
    </div>
  )
}
