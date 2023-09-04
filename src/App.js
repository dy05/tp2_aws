import React, { useEffect, useState } from 'react'
import { Amplify, API } from 'aws-amplify'
// import { Amplify, API, Storage } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: "apiAws",
        endpoint: "https://vcslefq9g1.execute-api.us-east-1.amazonaws.com/dev",
        region: "us-east-1",
      },
    ],
  },
});

const App = ({ signOut, user }) => {
  const [resources, setResources] = useState(null);

  const sendForm = () => {
    console.log('loll')
  }

  const deleteImage = (id) => {
    console.log('id')
    console.log(id)
  }

  const fetchApiData = async () => {
    try {
      const response = await API.get('apiAws', '/resources', {});
      // Storage.put('')
      console.log('Resource response', response);
      setResources(response);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  useEffect(() => {
    fetchApiData().then(() => {
      console.log('End fetch API')
    });
  }, []);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center text-white">
                {user.attributes.email}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button onClick={signOut} type="button" className="relative p-1 text-gray-400 hover:text-white">
                Sign out
              </button>

              <div className="relative ml-3">
                <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-2 gap-5 p-2 sm:p-4">
        <div className="flex flex-col">
          <div className="mb-4">
            <button onClick={fetchApiData} className="bg-black text-white text-xl p-2">
              Recharger les données de l'API
            </button>
          </div>
          <div className="flex">
            <div className="flex items-center w-1/4">
              <h2>Résultat de l'appel API</h2>
            </div>
            <div className="overflow-x-auto code bg-gray-200">
              {resources && (
                <div>
                  <pre>{JSON.stringify(resources, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h2>
              Ajouter un fichier a votre stockage Cloud
            </h2>
            <form action="" onSubmit={sendForm} encType="multipart/form-data">
              <div className="flex">
                <input type="file" name="file" placeholder="Choisir un fichier"/>
                <button type="submit">
                  Telecharger
                </button>
              </div>
            </form>
            <div className="flex flex-col">
              <div className="flex">
                <span>
                  fichier 1
                </span>
                <button type="button" onClick={() => deleteImage(1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
              <div>
                fichier 2
              </div>
            </div>
          </div>
          <div>
            <h2>
              Envoyer une notification
            </h2>
            <form action="">

            </form>
          </div>
          <div>
            <div className="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
              <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                      <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                        Get in touch
                      </h1>
                      <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                        Fill in the form to start a conversation
                      </p>

                      <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                          Acme Inc, Street, State,
                          Postal Code
                        </div>
                      </div>

                      <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                          +44 1234567890
                        </div>
                      </div>

                      <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                          info@acme.org
                        </div>
                      </div>
                    </div>

                    <form className="p-6 flex flex-col justify-center">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="hidden">Full Name</label>
                        <input type="name" name="name" id="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                      </div>

                      <div className="flex flex-col mt-2">
                        <label htmlFor="email" className="hidden">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                      </div>

                      <div className="flex flex-col mt-2">
                        <label htmlFor="tel" className="hidden">Number</label>
                        <input type="tel" name="tel" id="tel" placeholder="Telephone Number" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                      </div>

                      <button type="submit" className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthenticator(App);
