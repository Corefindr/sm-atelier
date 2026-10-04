"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sizeRows = [
  { size: "XS", bust: "32", waist: "25", hip: "35" },
  { size: "S", bust: "34", waist: "27", hip: "37" },
  { size: "M", bust: "36", waist: "29", hip: "39" },
  { size: "L", bust: "38", waist: "31", hip: "41" },
  { size: "XL", bust: "41", waist: "34", hip: "44" },
];

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="text-[11px] tracking-[0.16em] text-ink uppercase underline decoration-beige underline-offset-4 hover:text-taupe"
          />
        }
      >
        Size guide
      </DialogTrigger>
      <DialogContent className="bg-cream sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-medium">
            Size guide
          </DialogTitle>
          <DialogDescription>
            Body measurements in inches. If you are between sizes, take the larger one.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">SM Atelier body measurements</caption>
            <thead>
              <tr className="border-b border-beige text-[11px] tracking-[0.16em] text-taupe uppercase">
                <th scope="col" className="py-2 pr-4 font-medium">Size</th>
                <th scope="col" className="py-2 pr-4 font-medium">Bust</th>
                <th scope="col" className="py-2 pr-4 font-medium">Waist</th>
                <th scope="col" className="py-2 font-medium">Hip</th>
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((row) => (
                <tr key={row.size} className="border-b border-beige/70">
                  <th scope="row" className="py-2 pr-4 font-medium">{row.size}</th>
                  <td className="py-2 pr-4">{row.bust}</td>
                  <td className="py-2 pr-4">{row.waist}</td>
                  <td className="py-2">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-6 text-taupe">
          One-size knits are cut with ease and do not follow this chart.
        </p>
        <Button
          nativeButton={false}
          variant="outline"
          render={<a href="/contact#exchanges" />}
          className="h-11 rounded-none"
        >
          Ask about exchanges
        </Button>
      </DialogContent>
    </Dialog>
  );
}
