import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import type React from "react" // Added import for React
import axios from "@/utils/axios"

export default function ProfileEdit() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")
  const [imgPath,setImgPath] = useState("");
  let fetchUser = async () => {
    try {
      const user = await axios.post(`/auth/me`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return user;

    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchUser()
    .then((res)=>{
      let {name,email,profile_photo_path} =res.data.user;
      setName(name);
      setEmail(email);
      setAvatar(profile_photo_path || "/placeholder.svg?height=100&width=100");
    })
    .catch((err)=>{
      console.log(err);
      
    });
    


  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    try {
      
      const response = await axios.patch(`/profile/update`, {
        name,
        email,
        password,
        profile_photo_path: imgPath
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })


    } catch (error: any) {
      console.error(error)
    }


  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)

      const formData = new FormData();
      formData.append("photo", file); // Append file
    
      let ImgPath = axios.post("/profile/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    let data = await ImgPath;
    
    let path = data.data.path;

    setImgPath(path);

    }
  }






  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatar} alt="Profile picture" />
                <AvatarFallback>
                </AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarChange}
                />
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

