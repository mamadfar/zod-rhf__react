import {z, ZodType} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface IFormData {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    password: string,
    confirmPassword: string
}

function App() {

    const schema: ZodType<IFormData> = z.object({
        firstName: z.string().min(2).max(30),
        lastName: z.string().min(2).max(30),
        email: z.string().email(),
        age: z.number().int().positive().min(18).max(80),
        password: z.string().min(5).max(20),
        confirmPassword: z.string().min(5).max(20)
    }).refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });

    const {register, handleSubmit, formState: {errors}} = useForm<IFormData>({resolver: zodResolver(schema)});

    const onSubmit = (data: IFormData) => {
        console.log(data)
    }

    return (
        <div className="w-full min-h-screen grid grid-cols-6 place-content-center">
            <fieldset className="border rounded-md px-6 py-4 col-span-2 col-start-3">
                <legend className="text-center px-2 font-bold text-2xl">Form</legend>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="firstName">First Name: </label>
                            <input type="text" id="firstName" className="border-2 rounded-md" {...register("firstName")}/>
                            {errors.firstName && <small className="text-red-400">{errors.firstName.message}</small>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastName">Last Name: </label>
                            <input type="text" id="lastName" className="border-2 rounded-md" {...register("lastName")}/>
                            {errors.lastName && <small className="text-red-400">{errors.lastName.message}</small>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" className="border-2 rounded-md" {...register("email")}/>
                            {errors.email && <small className="text-red-400">{errors.email.message}</small>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="age">Age: </label>
                            <input type="number" id="age" className="border-2 rounded-md" {...register("age", {valueAsNumber: true})}/>
                            {errors.age && <small className="text-red-400">{errors.age.message}</small>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" className="border-2 rounded-md" {...register("password")}/>
                            {errors.password && <small className="text-red-400">{errors.password.message}</small>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input type="password" id="confirmPassword" className="border-2 rounded-md" {...register("confirmPassword")}/>
                            {errors.confirmPassword && <small className="text-red-400">{errors.confirmPassword.message}</small>}
                        </div>
                        <div>
                            <button className="border px-3 py-1 rounded-md">Submit</button>
                        </div>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}

export default App
