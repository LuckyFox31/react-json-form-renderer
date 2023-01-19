import {useEffect, useState} from "react";

export default function FormRenderer({path, parameters}){
	const [schema, setSchema] = useState(null);

	useEffect(() => {
		fetch(path, parameters)
			.then(res => res.json())
			.then(schema => setSchema(schema));
	}, []);


	return (
		<>
			{ schema && (
				<>
					<h2>{schema.title}</h2>

					{ schema.inputs.map((input, key) => (
						<div className="my-3" key={key}>
							<label className="form-label" htmlFor={input.name}>
								{input.title}
								{input.required && <sup className="text-danger">*</sup>}
							</label>
							{ input.type === 'textarea' ?
								<textarea
									className="form-control"
									id={input.name}
									{...input}
								></textarea> :
								<input
									className="form-control"
									id={input.name}
									{...input}
								/>
							}
						</div>
					))}
				</>
			)}
		</>
	)
}