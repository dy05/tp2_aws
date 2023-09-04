import React, {useEffect, useRef, useState} from 'react'
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
  const mounted = useRef(false);
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
    if (!mounted.current) {
      mounted.current = true;

      fetchApiData().then();
    }
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
            <button onClick={fetchApiData} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-5 rounded-lg transition ease-in-out duration-300 text-xl">
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
            <h2 className="font-bold text-xl">
              Ajouter un fichier a votre stockage Cloud
            </h2>
            <form action="" onSubmit={sendForm} encType="multipart/form-data">
              <div className="mb-6 pt-4">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload File
                </label>

                <div className="mb-8">
                  <input type="file" name="file" id="file" className="sr-only" />
                  <label
                    htmlFor="file"
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div>
            <span className="mb-2 block text-xl font-semibold text-[#07074D]">
              Drop files here
            </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">
              Or
            </span>
                      <span
                        className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                      >
              Browse
            </span>
                    </div>
                  </label>
                </div>

                <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
          <span className="truncate pr-3 text-base font-medium text-[#07074D]">
            banner-design.png
          </span>
                    <button className="text-[#07074D]">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
          <span className="truncate pr-3 text-base font-medium text-[#07074D]">
            banner-design.png
          </span>
                    <button className="text-[#07074D]">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                    <div
                      className="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <label htmlFor="file" className="">
                  Choisir un fichier
                  <input type="file" id="file" name="file" placeholder="Choisir un fichier" className="hidden"/>
                </label>
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
            <form className="flex flex-col justify-center">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Destinataire
                  <span>
                    (email)
                  </span>
                </label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                       type="email" id="email" name="email" placeholder="dyos98@gmail.com"/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                  Contenu du mail
                </label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          id="content" name="content" placeholder="Bonjour le monde" minLength={4}></textarea>
              </div>

              <button type="submit" className="md:w-32 bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthenticator(App);
