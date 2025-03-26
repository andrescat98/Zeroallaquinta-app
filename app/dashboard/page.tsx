"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Home, LogOut, Menu, Music, Theater } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

export default function Dashboard() {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("home");
                      }}
                    >
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("calendar");
                      }}
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Calendario</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("create");
                      }}
                    >
                      <Clock className="h-5 w-5" />
                      <span>Crea Evento</span>
                    </a>
                    <div className="mt-4 border-t pt-4">
                      <Link
                        href="/"
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent text-muted-foreground"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Esci</span>
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-xl font-bold">Associazione Culturale</h1>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        {!isMobile && (
          <aside className="w-64 border-r p-4 hidden md:block">
            <nav className="flex flex-col gap-2">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("home")}
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
              <Button
                variant={activeTab === "calendar" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("calendar")}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Calendario
              </Button>
              <Button
                variant={activeTab === "create" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("create")}
              >
                <Clock className="mr-2 h-5 w-5" />
                Crea Evento
              </Button>
              <div className="mt-auto pt-4">
                <Button variant="ghost" className="justify-start w-full text-muted-foreground" asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-5 w-5" />
                    Esci
                  </Link>
                </Button>
              </div>
            </nav>
          </aside>
        )}

        {/* Content area */}
        <main className="flex-1 p-4">
          {activeTab === "home" && <HomeContent />}
          {activeTab === "calendar" && <CalendarContent />}
          {activeTab === "create" && <CreateEventContent />}
        </main>
      </div>
    </div>
  )
}

function HomeContent() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Concerto di test push",
      date: "15 Aprile 2025",
      time: "20:30",
      location: "Teatro Comunale",
      type: "music",
    },
    {
      id: 2,
      title: "Spettacolo Teatrale: Romeo e Giulietta",
      date: "22 Aprile 2025",
      time: "21:00",
      location: "Auditorium Centrale",
      type: "theater",
    },
    {
      id: 3,
      title: "Workshop di Improvvisazione Jazz",
      date: "28 Aprile 2025",
      time: "18:00",
      location: "Sala Musica",
      type: "music",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Benvenuto</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Eventi Totali</CardTitle>
            <CardDescription>Eventi programmati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Eventi Musicali</CardTitle>
            <CardDescription>Concerti e workshop</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Eventi Teatrali</CardTitle>
            <CardDescription>Spettacoli e letture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-bold mt-8">Prossimi Eventi</h3>
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.location}</CardDescription>
                </div>
                <Badge variant={event.type === "music" ? "default" : "secondary"}>
                  {event.type === "music" ? <Music className="h-3 w-3 mr-1" /> : <Theater className="h-3 w-3 mr-1" />}
                  {event.type === "music" ? "Musica" : "Teatro"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{event.date}</span>
                <Clock className="h-4 w-4 ml-3 mr-1 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                Dettagli
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CalendarContent() {
  // Simplified calendar view
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const events = [
    { day: 15, title: "Concerto di Musica Classica", type: "music" },
    { day: 22, title: "Spettacolo Teatrale", type: "theater" },
    { day: 28, title: "Workshop Jazz", type: "music" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendario Eventi</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Oggi
          </Button>
          <Button variant="outline" size="sm">
            Mese
          </Button>
          <Button variant="outline" size="sm">
            Anno
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aprile 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((day) => (
              <div key={day} className="text-sm font-medium py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month start */}
            <div className="h-20 p-1 border rounded-md"></div>
            <div className="h-20 p-1 border rounded-md"></div>
            <div className="h-20 p-1 border rounded-md"></div>

            {days.map((day) => {
              const dayEvents = events.filter((e) => e.day === day)
              return (
                <div
                  key={day}
                  className={`h-20 p-1 border rounded-md relative ${dayEvents.length > 0 ? "bg-accent/20" : ""}`}
                >
                  <div className="text-sm font-medium">{day}</div>
                  {dayEvents.map((event, i) => (
                    <div
                      key={i}
                      className={`text-xs p-1 mt-1 rounded truncate ${
                        event.type === "music"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/20 text-secondary-foreground"
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CreateEventContent() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Crea Nuovo Evento</h2>

      <Card>
        <CardHeader>
          <CardTitle>Dettagli Evento</CardTitle>
          <CardDescription>Inserisci le informazioni per il nuovo evento culturale</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titolo Evento</Label>
            <Input id="title" placeholder="Inserisci il titolo dell'evento" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Orario</Label>
              <Input id="time" type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Luogo</Label>
            <Input id="location" placeholder="Inserisci il luogo dell'evento" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo di Evento</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input type="radio" id="music" name="type" className="h-4 w-4" />
                <Label htmlFor="music" className="font-normal">
                  Musicale
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="theater" name="type" className="h-4 w-4" />
                <Label htmlFor="theater" className="font-normal">
                  Teatrale
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="other" name="type" className="h-4 w-4" />
                <Label htmlFor="other" className="font-normal">
                  Altro
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Inserisci una descrizione dettagliata dell'evento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Immagine (opzionale)</Label>
            <Input id="image" type="file" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annulla</Button>
          <Button>Crea Evento</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

