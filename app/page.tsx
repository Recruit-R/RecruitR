'use client'
import { Button } from "@/components/ui/button";
import getData from "./api/getData";

export default function Home() {
  const handleForm = async () => {
    getData({ collection_name: 'users' });
    // const { result, error } = await addData('users', 'user-id', data)


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
