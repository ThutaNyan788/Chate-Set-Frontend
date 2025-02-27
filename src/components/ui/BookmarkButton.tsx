import { motion, AnimatePresence } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookmarkButtonProps {
    isBookmarked: boolean;
    onBookmarkToggle: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onBookmarkToggle }) => {
    return (
        <Button
            onClick={onBookmarkToggle}
            variant="ghost"
            size="sm"
            className={`interaction text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg ${isBookmarked ? 'text-red-500' : ''}`}
        >
            <div className="relative">
                {/* Heart Icon with Scaling Animation */}
                <motion.div
                    initial={{ scale: 1 }}
                    animate={isBookmarked ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, 0], opacity: [1, 0.8, 1] } : { scale: 1 }}
                    transition={{
                        duration: 0.4,
                        ease: "easeOut",
                    }}
                >
                    <Bookmark className={`mr-1 h-6 w-6 cursor-pointer transition-all ${isBookmarked ? "fill-current text-brandColor" : ""}`} />
                </motion.div>

                {/* Circle Explosion Effect */}
                <AnimatePresence>
                    {isBookmarked && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                        >
                            <div className="w-6 h-6 rounded-full bg-brandColor/60" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </Button>
    );
};

export default BookmarkButton;