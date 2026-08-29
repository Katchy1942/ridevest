import { useState, useEffect } from "react";
import { Bike, Plus } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Car02Icon, TruckIcon } from "@hugeicons/core-free-icons";
import { useDeliveryHandlers } from "../../handlers/deliveryHandlers";
import ConfirmLocationModal from "../../components/deliveries/ConfirmLocationModal";

const AddDeliveryPage = () => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const {
        transportMode,
        setTransportMode,
        formData,
        handleInputChange,
        handleSubmit,
        errorMessage,
        setErrorMessage,
        loading,
    } = useDeliveryHandlers();

    // Close modal and surface error above the button when submission fails
    useEffect(() => {
        if (errorMessage) {
            setIsConfirmOpen(false);
        }
    }, [errorMessage]);

    return (
        <div
            className="flex flex-col items-center justify-center
                min-h-screen px-0 py-8 pt-24 md:p-10 md:pt-28"
        >
            <div
                className="p-6 md:p-8
                    rounded-none md:rounded-2xl
                    border-0 md:border-5 border-zinc-800
                    w-full max-w-md md:max-w-xl"
            >
                <h2
                    className="text-xl font-semibold tracking-tighter
                        mb-6 flex justify-center text-zinc-100"
                >
                    Create Delivery
                </h2>

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col gap-5"
                >
                    <div className="space-y-4">
                        <h3 className="text-md tracking-tighter font-medium text-zinc-300">
                            Courier
                        </h3>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Courier Name
                            </label>
                            <input
                                type="text"
                                name="courier"
                                required
                                value={formData.courier}
                                onChange={handleInputChange}
                                placeholder="Logistics Company Name"
                                className="w-full px-4 sm:py-1.5 py-3 text-sm
                                    bg-zinc-900 border border-zinc-700
                                    rounded-md shadow-sm focus:border
                                    focus:outline-none focus:border-emerald-500
                                    text-zinc-100 placeholder-zinc-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-md tracking-tighter font-medium text-zinc-300">
                            Route
                        </h3>
                        <div className="relative pl-10">
                            <div className="absolute left-4 top-10 bottom-6 w-px bg-zinc-800"></div>

                            <div className="relative mb-8 group">
                                <div className="absolute -left-10 top-4 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-emerald-800/50 z-10">
                                    <div className="absolute inset-0 bg-emerald-900/30 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 bg-emerald-500 animate-pulse rounded-full relative z-20"></div>
                                </div>
                                <div className="space-y-1.5 relative">
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                                        Pickup Location (Landmark)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="pickup"
                                            required
                                            autoComplete="off"
                                            value={formData.pickup}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 123 Storage Facility, Lagos"
                                            className="w-full px-4 sm:py-1.5 py-3 text-sm
                                                bg-zinc-900 border border-zinc-700
                                                rounded-md shadow-sm focus:border
                                                focus:outline-none focus:border-emerald-500
                                                text-zinc-100 placeholder-zinc-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -left-10 top-8 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 z-10">
                                    <div className="absolute inset-0 bg-red-900/30 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 bg-red-500 animate-pulse rounded-full relative z-20"></div>
                                </div>
                                <div className="space-y-1.5 relative">
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                                        Drop-off Destination (Landmark)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="destination"
                                            required
                                            autoComplete="off"
                                            value={formData.destination}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 456 Customer Ave, Lagos"
                                            className="w-full px-4 sm:py-1.5 py-3 text-sm
                                                bg-zinc-900 border border-zinc-700
                                                rounded-md shadow-sm focus:border
                                                focus:outline-none focus:border-emerald-500
                                                text-zinc-100 placeholder-zinc-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-md tracking-tighter font-medium text-zinc-300">
                            Recipient
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="receiverName"
                                    required
                                    value={formData.receiverName}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 sm:py-1.5 py-3 text-sm
                                        bg-zinc-900 border border-zinc-700
                                        rounded-md shadow-sm focus:border
                                        focus:outline-none focus:border-emerald-500
                                        text-zinc-100 placeholder-zinc-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="receiverPhone"
                                    required
                                    value={formData.receiverPhone}
                                    onChange={handleInputChange}
                                    placeholder="070 0000 000"
                                    className="w-full px-4 sm:py-1.5 py-3 text-sm
                                        bg-zinc-900 border border-zinc-700
                                        rounded-md shadow-sm focus:border
                                        focus:outline-none focus:border-emerald-500
                                        text-zinc-100 placeholder-zinc-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-md tracking-tighter font-medium text-zinc-300">
                            Sender
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="senderName"
                                    required
                                    value={formData.senderName}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 sm:py-1.5 py-3 text-sm
                                        bg-zinc-900 border border-zinc-700
                                        rounded-md shadow-sm focus:border
                                        focus:outline-none focus:border-emerald-500
                                        text-zinc-100 placeholder-zinc-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="senderPhone"
                                    required
                                    value={formData.senderPhone}
                                    onChange={handleInputChange}
                                    placeholder="070 0000 000"
                                    className="w-full px-4 sm:py-1.5 py-3 text-sm
                                        bg-zinc-900 border border-zinc-700
                                        rounded-md shadow-sm focus:border
                                        focus:outline-none focus:border-emerald-500
                                        text-zinc-100 placeholder-zinc-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-md tracking-tighter font-medium text-zinc-300">
                            Package Details
                        </h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                                        Weight Estimate (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weightEstimate"
                                        value={formData.weightEstimate}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0.0"
                                        className="w-full px-4 sm:py-1.5 py-3 text-sm
                                            bg-zinc-900 border border-zinc-700
                                            rounded-md shadow-sm focus:border
                                            focus:outline-none focus:border-emerald-500
                                            text-zinc-100 placeholder-zinc-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Mode of Transport (Dependent on weight and size)
                                </label>
                                <div className="grid grid-cols-3 gap-3 mt-1">
                                    {[
                                        { id: "bike", label: "Bike", Icon: Bike },
                                        {
                                            id: "car",
                                            label: "Car",
                                            Icon: Car02Icon,
                                            isHuge: true,
                                        },
                                        {
                                            id: "truck",
                                            label: "Truck",
                                            Icon: TruckIcon,
                                            isHuge: true,
                                        },
                                    ].map((mode) => {
                                        const Icon = mode.Icon as any;
                                        return (
                                            <label
                                                key={mode.id}
                                                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-colors cursor-pointer ${transportMode === mode.id ? "bg-emerald-900/20 border-emerald-500 text-emerald-500" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800"}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="transport"
                                                    value={mode.id}
                                                    className="sr-only"
                                                    checked={transportMode === mode.id}
                                                    onChange={(e) =>
                                                        setTransportMode(e.target.value)
                                                    }
                                                />
                                                {mode.isHuge ? (
                                                    <HugeiconsIcon
                                                        icon={Icon}
                                                        strokeWidth={1.5}
                                                        size={20}
                                                        className="mb-2"
                                                    />
                                                ) : (
                                                    <Icon
                                                        strokeWidth={1.5}
                                                        className="mb-2 w-6 h-6"
                                                    />
                                                )}
                                                <span className="text-xs font-medium">
                                                    {mode.label}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Delivery Notes (Optional)
                                </label>
                                <textarea
                                    name="deliveryNotes"
                                    value={formData.deliveryNotes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Any special instructions for the driver..."
                                    className="w-full px-4 sm:py-1.5 py-3 text-sm
                                        bg-zinc-900 border border-zinc-700
                                        rounded-md shadow-sm focus:border
                                        focus:outline-none focus:border-emerald-500
                                        text-zinc-100 placeholder-zinc-500 transition-colors resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <div className="w-full flex flex-col gap-2 justify-between items-center">
                            {errorMessage && (
                                <p className="w-full text-xs text-red-400 text-center py-1.5 px-3">
                                    {errorMessage}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setErrorMessage("");
                                    setIsConfirmOpen(true);
                                }}
                                className="w-full bg-emerald-700 text-sm flex justify-center
                                    tracking-tight items-center text-black font-medium
                                    py-2 rounded-full hover:bg-emerald-600
                                    transition-colors shadow-sm cursor-pointer"
                            >
                                <span className="flex items-center justify-center gap-1.5">
                                    <Plus
                                        size={15}
                                        strokeWidth={1.5}
                                        className="text-black"
                                    />
                                    Create delivery
                                </span>
                            </button>
                        </div>
                    </div>

                    <ConfirmLocationModal
                        isOpen={isConfirmOpen}
                        onClose={() => setIsConfirmOpen(false)}
                        onConfirm={handleSubmit}
                        formData={formData}
                        transportMode={transportMode}
                        loading={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddDeliveryPage;
