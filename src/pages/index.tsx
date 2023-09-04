import type { NextPage } from 'next'

import React from 'react'
import { AdminLayout } from '@layout'

import { useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";


function Home() {


  return (

    <AdminLayout>
      <h1>Home</h1>
    </AdminLayout>
  )
}

export default Home
