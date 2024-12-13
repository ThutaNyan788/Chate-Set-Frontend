"use client"

import { useState, useEffect } from 'react'
import { ArrowRight, Users, BookOpen, Calendar, Bell, MessageSquare, Zap } from 'lucide-react'


export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section className=" relative overflow-hidden py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="absolute top-4 right-4 z-10">
        
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className=" transition-colors text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl xl:text-6xl">
              Connect, Learn, 
            </h1>
            <h1 className=" transition-colors text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl xl:text-6xl">
              and Thrive in 
            </h1>
            <h1 className=" transition-colors text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl xl:text-5xl">
              Student Community
            </h1>
            
            
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Join the ultimate platform that brings your campus to life. Network with peers, access resources, and never miss an event.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <input 
              type="email" 
              placeholder="Enter your email" 
              className="max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 flex items-center">
              Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <FeatureCard icon={Users} title="Connect" description="Network with peers" />
              <FeatureCard icon={BookOpen} title="Learn" description="Access study resources" />
              <FeatureCard icon={Calendar} title="Events" description="Never miss campus events" />
              <FeatureCard icon={MessageSquare} title="Discussions" description="Engage in forums" />
            </div>
          </div>
          <div className="lg:ml-auto relative">
            <div className="relative mx-auto w-full max-w-[640px]">
                <div className="relative">
                {/* <div className="w-full h-auto bg-cover bg-center" style={{ backgroundImage: "url('/public/img/mockup/2.png')" }}></div> */}
                <img src="/public/img/mockup.png" alt="" />
               
                </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full opacity-70 blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 rounded-full opacity-70 blur-3xl"></div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <Stat number="10k+" label="Active Users" />
              <Stat number="500+" label="Daily Posts" />
              <Stat number="50+" label="Partner Universities" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white text-center">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">{description}</p>
    </div>
  )
}

function Stat({ number, label }: { number: string, label: string }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{number}</span>
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  )
}

