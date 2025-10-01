import { useNavigate, useRouter } from "@tanstack/react-router"
import { useSetAtom } from "jotai"
import { forwardRef } from "react"
import { Drawer } from "vaul"
import { cx } from "../utils/cx"
import { isCommandMenuOpenAtom } from "./command-menu"
import { IconButton, IconButtonProps } from "./icon-button"
import { ArrowLeftIcon16, ArrowRightIcon16, CommandIcon16, MenuIcon16, PlusIcon16 } from "./icons"
import { NavItems } from "./nav-items"

export function NavBar() {
  const router = useRouter()
  const navigate = useNavigate()
  const setIsCommandMenuOpen = useSetAtom(isCommandMenuOpenAtom)

  return (
    <div className="border-t border-border-secondary">
      <div className="flex h-[var(--height-nav-bar)] items-stretch  p-2 [&>button]:h-full">
        <Drawer.Root shouldScaleBackground={false}>
          <Drawer.Trigger asChild>
            <NavButton aria-label="Open navigation menu">
              <MenuIcon16 />
            </NavButton>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-gradient-to-t from-[#000000] to-[#00000000] eink:bg-none" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 flex h-[80%] flex-col bg-bg-overlay eink:ring-2 eink:ring-border rounded-t-[calc(var(--border-radius-base)+12px)]">
              <div className="grid flex-1 scroll-py-2 grid-rows-[auto_1fr] overflow-y-auto p-3 pb-[max(env(safe-area-inset-bottom),12px)]">
                <Drawer.Title className="sr-only">Navigation</Drawer.Title>
                <NavItems size="large" />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
        <NavButton aria-label="Go back" onClick={() => router.history.back()}>
          <ArrowLeftIcon16 />
        </NavButton>
        <NavButton aria-label="Go forward" onClick={() => router.history.forward()}>
          <ArrowRightIcon16 />
        </NavButton>
        <NavButton aria-label="Open command menu" onClick={() => setIsCommandMenuOpen(true)}>
          <CommandIcon16 />
        </NavButton>
        <NavButton
          aria-label="New note"
          shortcut={["⌘", "⇧", "O"]}
          onClick={() =>
            navigate({
              to: "/notes/$",
              params: { _splat: `${Date.now()}` },
              search: {
                mode: "write",
                query: undefined,
                view: "grid",
              },
            })
          }
        >
          <PlusIcon16 />
        </NavButton>
      </div>
    </div>
  )
}

const NavButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ className, ...props }, ref) => {
  return (
    <IconButton
      ref={ref}
      size="small"
      disableTooltip
      className={cx("!w-full", className)}
      {...props}
    />
  )
})

NavButton.displayName = "NavButton"
