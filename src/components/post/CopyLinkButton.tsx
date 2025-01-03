import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link2 } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
    link : string;
}

const CopyLinkButton = ({ link }: Props) => {

    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);

            //Reset copied state after 2 second 
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    }
  return (
    
      <div className="relative">
          <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              className="interaction text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
          >
              <Link2 className="h-4 w-4" />
          </Button>
          {
              copied && (
                  <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                  >
                      Copied!
                  </motion.div>
              )
          }
      </div>
  )
}

export default CopyLinkButton