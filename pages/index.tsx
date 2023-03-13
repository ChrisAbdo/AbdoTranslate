import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import { ArrowLeftRight, Loader2, Volume2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useToast } from "../utils/hooks/use-toast";

const Home: NextPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState("Spanish");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const prompt = "Please translate " + bio + " to " + vibe;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Twitter Bio Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <button onClick={generateBio}>Generate Bio</button>

        {loading ? <p>Loading...</p> : <p>{generatedBios}</p>} */}
        <div className="flex flex-col md:flex-row">
          {/* LEFT PANEL */}
          <div className="border-r border-black p-4 md:w-1/2">
            <div className="flex justify-between">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Russian">Russian</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Arabic">Arabic</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Swedish">Swedish</SelectItem>
                  <SelectItem value="Finnish">Finnish</SelectItem>
                  <SelectItem value="Norwegian">Norwegian</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost">
                <ArrowLeftRight />
              </Button>
            </div>

            <div className="relative mt-4">
              <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <textarea
                  rows={2}
                  name="description"
                  id="description"
                  className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Translate any text to any language here"
                  defaultValue={""}
                  onChange={(e) => setBio(e.target.value)}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true">
                  <div className="py-2">
                    <div className="h-9" />
                  </div>
                  <div className="h-px" />
                  <div className="py-2">
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-px bottom-0">
                {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3"></div>
                <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                  <div className="flex-shrink-0">
                    {!loading && (
                      <Button onClick={generateBio} variant="default">
                        Translate
                      </Button>
                    )}
                    {loading && (
                      <Button variant="default">
                        Translating <Loader2 className="animate-spin" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT PANEL */}
          <div className="p-4 md:w-1/2">
            <div>
              <Select
                defaultValue={vibe}
                onValueChange={(value) => setVibe(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Spanish" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Russian">Russian</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Arabic">Arabic</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Swedish">Swedish</SelectItem>
                  <SelectItem value="Finnish">Finnish</SelectItem>
                  <SelectItem value="Norwegian">Norwegian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative mt-4">
              <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <textarea
                  rows={2}
                  name="description"
                  id="description"
                  className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your translated text will appear here"
                  // @ts-ignore
                  value={generatedBios}
                  defaultValue={""}
                  disabled
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true">
                  <div className="py-2">
                    <div className="h-9" />
                  </div>
                  <div className="h-px" />
                  <div className="py-2">
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-px bottom-0">
                  {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                  <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3"></div>
                  {generatedBios && (
                    <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                      <motion.div
                        className="flex-shrink-0 space-x-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          onClick={() => {
                            // @ts-ignore
                            navigator.clipboard.writeText(generatedBios);
                            toast({
                              title: "Copied to clipboard",
                              description: "Thanks for using the app!",
                            });
                          }}
                          variant="outline"
                        >
                          Copy
                        </Button>
                        {/*  */}
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button variant="outline">Share</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Share to social media
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                I just learned how to translate text to any
                                language using AbdoTranslate. Check it out!
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
