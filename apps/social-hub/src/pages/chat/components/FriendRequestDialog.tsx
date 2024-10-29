import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Search, Mail, Loader2 } from "lucide-react";
import { useRequest } from "ahooks";
import { APIManager } from "@/instances";
import { IUser } from "@/types";

function UserCard({
  user,
  onSendRequest,
}: {
  user: IUser;
  onSendRequest: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg shadow-lg"
    >
      <Avatar className="w-24 h-24 border-4 border-primary/20">
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback>
          {user.username
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h3 className="text-xl font-semibold">{user.nickname}</h3>
        <p className="text-sm text-muted-foreground">{user.username}</p>
      </div>
      <p className="text-sm text-center max-w-xs">{user.sex}</p>
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4" />
        <span>{user.email}</span>
      </div>
      <Button onClick={onSendRequest} className="w-full">
        <UserPlus className="w-4 h-4 mr-2" />
        发送好友请求
      </Button>
    </motion.div>
  );
}

interface FriendRequestDialogProps {
  open: boolean;
  onVisibleChange: (visible: boolean) => void;
  children?: ReactNode;
}
export default function FriendRequestDialog(props: FriendRequestDialogProps) {
  const { open, children, onVisibleChange } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<IUser | null>(null);
  // const [isSearching, setIsSearching] = useState(false);
  const { runAsync: searchUser, loading: searchUserLoading } = useRequest(
    APIManager.userService.search,
    {
      manual: true,
      debounceWait: 400,
      onSuccess: (response) => {
        setSearchResult(response.data);
      },
    },
  );
  useEffect(() => {
    if (searchQuery) {
      searchUser({ exact: searchQuery }).then();
    }
  }, [searchQuery]);
  // const handleSearch = () => {
  //   setIsSearching(true);
  //   setTimeout(() => {
  //     const result = mockUsers.find(
  //       (user) =>
  //         user.username.toLowerCase() === searchQuery.toLowerCase() ||
  //         user.email.toLowerCase() === searchQuery.toLowerCase(),
  //     );
  //     setSearchResult(result || null);
  //     setIsSearching(false);
  //   }, 1000); // Simulating API call delay
  // };

  const handleSendRequest = () => {
    alert(`Friend request sent to ${searchResult?.username}`);
    setSearchResult(null);
    setSearchQuery("");
    onVisibleChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onVisibleChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            添加好友
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="搜索用户名或邮箱"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>
            {/*<Button onClick={handleSearch} disabled={isSearching}>*/}
            {/*  {isSearching ? (*/}
            {/*    <Loader2 className="w-4 h-4 animate-spin" />*/}
            {/*  ) : (*/}
            {/*    "搜索"*/}
            {/*  )}*/}
            {/*</Button>*/}
          </div>
          <AnimatePresence mode="wait">
            {searchUserLoading ? (
              <motion.div
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-48"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </motion.div>
            ) : searchResult ? (
              <UserCard
                key="result"
                user={searchResult}
                onSendRequest={handleSendRequest}
              />
            ) : (
              searchQuery && (
                <motion.p
                  key="not-found"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground"
                >
                  暂无该用户，请尝试不同的用户名或者邮箱
                </motion.p>
              )
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
